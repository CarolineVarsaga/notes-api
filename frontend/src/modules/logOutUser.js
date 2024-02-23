import renderLogin from "./views/logInPage.js";

//==================================================
//================   LOG OUT USER   ================
//================================================== 
export default function logOutBtn() {
    const logOutBtn = document.getElementById('logOutBtn');
    logOutBtn.addEventListener('click', logOut);
}

function logOut() {
    localStorage.clear(); 
    renderLogin(); 
}
