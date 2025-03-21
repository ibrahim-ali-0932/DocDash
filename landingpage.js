const signInbtn = document.getElementById("signInbtn");
const signUpbtn = document.getElementById("signUpbtn");
const overlay = document.getElementById("overlay");

signInbtn.addEventListener("click", () => {
    overlay.classList.add("active");
});
signUpbtn.addEventListener("click", () => {
    overlay.classList.add("active");
});

overlay.addEventListener("click", (e) => {
 if (e.target === overlay) {
    overlay.classList.remove("active");
}
});