const signInbtn = document.getElementById("signInbtn");
const signUpbtn = document.getElementById("signUpbtn");
const overlay = document.getElementById("overlay");
const modalContent = document.getElementById("signIn-Up-modal");
const submitBtn = document.getElementById("signUp-submit-btn");
const getstartedLabel = document.querySelector(".get-started-label");
const signUpContent = `
  <div class="logo-brand">
  <button class="logo-brand-btn" href="index.html">
    <img src="/images-videos/Dash.svg" alt="">
  </button>
</div>
<div class="get-started">
  <h6 class="get-started-heading"> Get started absolutely free</h6>
  <p class="get-started-para"> Already have an account?<a href="#" class="text2 get-started-label" style="text-decoration: none;">Log in</a></p>
</div>
<div class="form-box d-flex flex-column justify-content-center gap-5">
  <form class="d-flex flex-column justify-content-center gap-4">
    <div class="row first-last-name">
      <div class="col firstname">
        <input type="text" class="form-control firstname-input" name="fname" id="fname">
        <span class="name-label"><label for="fname">First Name</label></span>
      </div>
      <div class="col lastname">
        <input type="text" class="form-control" name="lname" id="lname">
        <span class="name-label"><label for="lanme">Last name</label></span>
      </div>
    </div>
    <div class="row email-div">
      <input type="text" class="form-control" name="email" id="email">
      <span class="email-label"><label for="email">Enter Email</label></span>
    </div>
    <div class="row email-div pswd-div">
      <input type="password" class="form-control"  name="pswd" id="pswd">
      <span class="email-label"><label for="email">Enter Password</label></span>
    </div>
  </form>
  <button class="btn btn-outline-dark myfont" id="signUp-submit-btn">Submit</button>
</div>
<div class="signInModal-footer">
  <div class="OR-divider ">
   <label for="OR-divider" class="OR">OR</label>
  </div>
  <div class="social-media-btns d-flex justify-content-center gap-4">
   <a href="#" class="text2"><i class="fab fa-google"></i></a>
   <a href="#" class="text1"><i class="fab fa-facebook"></i></a>
   <a href="#" class="text2"><i class="fab fa-github"></i></a>
   
  </div>
</div>
</div>`;

const signInContent = `
  <div class="logo-brand">
    <button class="logo-brand-btn" href="index.html">
      <img src="/images-videos/Dash.svg" alt="">
    </button>
  </div>
<div class="get-started">
  <h6 class="get-started-heading">Sign In to you account</h6>
  <p class="get-started-para"> Don't have an account?<a href="#" class="text1 get-started-label" style="text-decoration: none;">Sign Up</a></p>
</div>
<div class="form-box2 d-flex flex-column justify-content-center gap-5">
  <form class="d-flex flex-column justify-content-center gap-4">
    <div class="row email-div" >
      <input type="text" class="form-control" name="email">
      <span class="email-label"><label for="email">Enter Email</label></span>
    </div>
    <div class="row email-div">
      <input type="password" class="form-control"  name="pswd">
      <span class="email-label"><label for="email">Enter Password</label></span>
      <span class="pswd-label"><a href="#" class="text1 forget-pswd-label" style="text-decoration: none;">Forgot password</a></span>
    </div>
  </form>
  <button class="btn btn-outline-dark myfont" id="signIn-submit-btn">Submit</button>
</div>
<div class="Modal-footer">
  <div class="OR-divider ">
   <label for="OR-divider" class="OR">OR</label>
  </div>
  <div class="social-media-btns d-flex justify-content-center gap-4">
   <a href="#" class="text1"><i class="fab fa-google"></i></a>
   <a href="#" class="text2"><i class="fab fa-facebook"></i></a>
   <a href="#" class="text1"><i class="fab fa-github"></i></a>
  </div>
`;
const forgetPasswordContent = `
   <div class="logo-brand">
    <button class="logo-brand-btn" href="index.html">
      <img src="/images-videos/Dash.svg" alt="">
    </button>
  </div>
<div class="get-started">
  <h6 class="get-started-heading">Forgot Password</h6>
  <p class="get-started-para">Enter you Email and we will send a Link</p>
</div>
<div class="form-box3 d-flex flex-column justify-content-center gap-5">
  <form class="">
    <div class="email-div" >
      <input type="text" class="form-control" name="email">
      <span class="email-label"><label for="email">Enter Email</label></span>
    </div>
  </form>
  <button class="btn btn-outline-dark myfont" id="forgot-pswd-btn">Send</button>
</div>
  `;


function openModal(content) {
  modalContent.innerHTML = content;
  overlay.classList.add("active");
  if (content === signInContent) {
      const getstartedLabel = document.querySelector(".get-started-label");
      if (getstartedLabel) {
        getstartedLabel.addEventListener("click", (e) => {
          e.preventDefault();
          openModal(signUpContent);
        });
      }
  }
  if (content === signUpContent) {
    const getstartedLabel = document.querySelector(".get-started-label");
    if (getstartedLabel) {
      getstartedLabel.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(signInContent);
      });
    }
  }
  if (content === signInContent) {
    const forgetpswdLabel = document.querySelector(".forget-pswd-label");
    if (forgetpswdLabel) {
      forgetpswdLabel.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(forgetPasswordContent);
      });
    }
  }
}
signInbtn.addEventListener("click", () => {
  openModal(signInContent);
});
signUpbtn.addEventListener("click", () => {
  openModal(signUpContent);
});
overlay.addEventListener("click", (e) => {

  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});
document.addEventListener("click", function(e) {
  if (e.target && e.target.id === "switchToSignUp") {
    e.preventDefault();
    openModal(signUpContent);
  }
  if (e.target && e.target.id === "switchToSignIn") {
    e.preventDefault();
    openModal(signInContent);
  }
});
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "signUp-submit-btn") {
    let fname = document.querySelector('.firstname-input').value.trim();
    let lname = document.querySelector('.lastname .form-control').value.trim();
    let email = document.querySelector('.email-div input').value.trim();
    let pswd = document.querySelector('.pswd-div input').value.trim();

    const fnameObj = document.getElementById("fname");
    const lnameObj = document.getElementById("lname");
    const emailObj = document.getElementById("email");
    const pswdObj = document.getElementById("pswd");

    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    let errors = [];

    if (!nameRegex.test(fname)) {
      errors.push("First name can only contain letters.");
      fnameObj.style.border = "2px solid red";
      fnameObj.style.backgroundColor = "#FFCDD2";
    }

    if (!nameRegex.test(lname)) {
      errors.push("Last name can only contain letters.");
      lnameObj.style.border = "2px solid red";
      lnameObj.style.backgroundColor = "#FFCDD2";
    }

    if (!emailRegex.test(email)) {
      errors.push("Enter a valid email address.");
      emailObj.style.border = "2px solid red";
      emailObj.style.backgroundColor = "#FFCDD2";
    }

    if (!passwordRegex.test(pswd)) {
      errors.push("Password must be at least 8 characters long.");
      pswdObj.style.border = "2px solid red";
      pswdObj.style.backgroundColor = "#FFCDD2";
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      // ✅ Submit to backend
      fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fname, lname, email, pswd }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Registration failed");
          return res.text();
        })
        .then((msg) => {
          alert(msg);
          overlay.classList.remove("active"); // Close the modal
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred while registering. Try again.");
        });
    }
  }
});
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "forgot-pswd-btn") {
    let email = document.querySelector('.email-div input').value.trim();
    if (!email) return alert("Please enter your email.");

    fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.text())
      .then((msg) => alert(msg))
      .catch((err) => alert("Failed to send email"));
  }
});
// FEEDBACK FORM HANDLING
const feedbackForm = document.getElementById("feedback-form");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const message = document.getElementById("feedback-message").value.trim();
    const userId = document.getElementById("feedback-userid").value.trim();
    const successDiv = document.getElementById("feedback-success");
    const errorDiv = document.getElementById("feedback-error");
    successDiv.style.display = "none";
    errorDiv.style.display = "none";
    fetch("http://localhost:3000/api/feedback/submit-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId || undefined, message })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to submit feedback");
        return res.text();
      })
      .then(msg => {
        successDiv.textContent = msg;
        successDiv.style.display = "block";
        feedbackForm.reset();
      })
      .catch(err => {
        errorDiv.textContent = err.message || "An error occurred.";
        errorDiv.style.display = "block";
      });
  });
}



