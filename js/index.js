document.addEventListener("DOMContentLoaded", () => {
    let userId = JSON.parse(localStorage.getItem("userID")) || ""
    if(userId === ""){
        const randomID = Math.floor(1000000 + Math.random() * 9000000);
        localStorage.setItem("userID", randomID)
    }
});
