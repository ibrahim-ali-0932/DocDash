const BACKEND_URL = "http://localhost:3000";
let userId = null;

document.getElementById("fetchBtn").addEventListener("click", () => {
  const email = document.getElementById("emailInput").value.trim();

  if (!email) return alert("Please enter an email");

  fetch("http://localhost:3000/api/users/check-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then(res => res.json())
    .then(data => {
      if (!data.exists) {
        alert("No user found with this email");
        return;
      }

      // Show fetched info and update section
      document.getElementById("userData").style.display = "block";
      document.getElementById("fetchedFname").textContent = data.user.fname;
      document.getElementById("fetchedLname").textContent = data.user.lname;
      document.getElementById("fetchedEmail").textContent = data.user.email;
      userId = data.user._id; // store for update
    })
    .catch(err => {
      console.error(err);
      alert("Failed to fetch user info");
    });
});

document.getElementById("updateBtn").addEventListener("click", () => {
  if (!userId) return alert("Fetch user info first");

  const fname = document.getElementById("updateFname").value.trim();
  const lname = document.getElementById("updateLname").value.trim();
  const email = document.getElementById("updateEmail").value.trim();

  const updates = {};
  if (fname) updates.fname = fname;
  if (lname) updates.lname = lname;
  if (email) updates.email = email;

  if (Object.keys(updates).length === 0) {
    alert("Nothing to update");
    return;
  }

  fetch(`http://localhost:3000/api/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })
    .then(res => res.json())
    .then(data => {
      alert("User info updated!");
      location.reload(); // refresh page to see updated info
    })
    .catch(err => {
      console.error(err);
      alert("Failed to update user info");
    });
});

document.getElementById("deleteBtn").addEventListener("click", async () => {
  if (!userId) return alert("Fetch a user first.");

  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("User deleted successfully.");
      userId = null;
      document.getElementById("userData").style.display = "none";
      document.getElementById("emailInput").value = "";
    } else {
      const result = await res.json();
      alert(result.message || "Failed to delete user.");
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Error deleting user.");
  }
});