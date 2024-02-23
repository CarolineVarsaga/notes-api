import logInUser from "../logInUser.js";
import createUser from "../createUser.js";
//===============================================================
let contentContainer = document.getElementById('contentContainer');

//==================================================
//=============   RENDER LOG IN PAGE   =============
//================================================== 
export default function renderLogin() {
    const htmlContent = `
        <section id="logInPage" class="log-in-page">
            <div id="signInContainer" class="sign-in">
                <div id="logInContainer" class="log-in-container">
                <h2>Välkommen till Anteckningar!</h2>
                <input id="userEmail" class="input" type="email" placeholder="E-post">
                <input id="userPassword" class="input" type="password" placeholder="Lösenord">
                <button id="logInBtn" class="btn">Logga in</button>
                <p id="newUser" class="new-user">Inte medlem? Skapa konto</p>                    
                </div>
            </div>
        </section>
    `;
    contentContainer.innerHTML = htmlContent; 

    const newUser = document.getElementById('newUser'); 
    newUser.addEventListener('click', renderCreateUser);

    const logInBtn = document.getElementById('logInBtn'); 
    logInBtn.addEventListener('click', logInUser);
} 
renderLogin(); 

//==================================================
//=============   RENDER CREATE USER   =============
//================================================== 
function renderCreateUser() {
    const htmlContent = `
        <section id="logInPage" class="log-in-page">
            <div id="signInContainer" class="sign-in">
                <div id="createUserContainer" class="create-user-container">
                    <h2>Ny användare:</h2>
                    <input id="createUserName" class="input" type="text" placeholder="Namn">
                    <input id="createUserEmail" class="input" type="text" placeholder="E-post">
                    <input id="createUserPassword" class="input" type="password" placeholder="Lösenord">
                    <button id="createUserBtn" class="btn">Skapa</button>
                    <button id="backToLogin" class="btn">Tillbaka</button>
                </div> 
            </div>
        </section>
    `;
    contentContainer.innerHTML = htmlContent; 

    let backBtn = document.getElementById('backToLogin');
    backBtn.addEventListener('click', renderLogin); 

    const createUserBtn = document.getElementById('createUserBtn');
    createUser(createUserBtn);
}


