import sidenav from "../sidenav.js";
import logOutBtn from "../logOutUser.js";
import printUserName from "../printUserName.js"; 
import renderAllPosts from "./printPosts.js";
import displayNewNotePage from "./addPost.js";
import renderDisplayPage from "./displayPost.js";
//==================================================
//==============   RENDER HOME PAGE   ==============
//================================================== 
export default function renderHomePage() {
    const htmlContent = `
        <header>
            <h1 class="heading">Anteckningar</h1>
            <div class="header-container">           
                <span class="material-symbols-outlined">
                    person
                </span>
                <button id="logOutBtn" class="btn">Logga ut</button> 
            </div>
        </header>
        <section class="logged-in-pages">
            <div class="sidenav">
                <a id="homeBtn"><abbr title="Hem"><span class="material-symbols-outlined">
                    home
                    </span></abbr></a>
                <a id="allNotesBtn"><abbr title="Alla Anteckningar"><span class="material-symbols-outlined">
                    note_stack
                    </span></abbr></a>
                <a id="newNoteBtn"><abbr title="Ny Anteckning"><span class="material-symbols-outlined">
                    note_add
                    </span></abbr></a>
            </div>

            <section class="home-container">
                <div id="homePage" class="home-page">
                    <div class="welcome-container">
                        <h2>Välkommen!</h2>
                        <h3 id="printPostCount"></h3>
                        <button id="allNotesHomeBtn" class="btn">Visa anteckningar</button>
                        <button id="newNoteHomeBtn" class="btn">Ny anteckning</button>
                    </div>
                    <div class="right-container">
                        <h2>Senaste anteckningarna</h2>
                        <div id="cardContainer" class="card-container"></div> 
                    </div>                    
                </div>
            </section>
        </section>
    `; 
    contentContainer.innerHTML = htmlContent; 
    sidenav();
    logOutBtn();
    printUserName(); 
    printOutPostCount();
    renderCards(); 

    const allNotesHomeBtn = document.getElementById('allNotesHomeBtn');
    const newNoteHomeBtn = document.getElementById('newNoteHomeBtn');

    allNotesHomeBtn.addEventListener('click', renderAllPosts);
    newNoteHomeBtn.addEventListener('click', displayNewNotePage);
}

//==================================================
//=============   PRINT POST COUNTER   =============
//================================================== 
function printOutPostCount() {
    let printPostCount = document.getElementById('printPostCount');
    let userId = localStorage.getItem('userId'); 
   
    fetch(`http://localhost:3000/post?userId=${userId}`) 
    .then(res => res.json())
    .then(posts => {
        let postCount = posts.length;
        printPostCount.textContent = `Antal anteckningar: ${postCount}`;
    })
    .catch(error => {
        console.error('Nånting är fel:', error);
    });
}
//==================================================
//=================   POST CARDS   =================
//==================================================
function renderCards() {
    let userId = localStorage.getItem('userId'); 
    let cardContainer = document.getElementById('cardContainer');

    fetch(`http://localhost:3000/post?userId=${userId}`) 
    .then(res => res.json())
    .then(data => {       
        let latestPosts = data.slice(-3); //three latest posts
        
        latestPosts.forEach(post => {
            let postDate = new Date(post.date);
            let formattedDate = `${postDate.toLocaleDateString()} ${postDate.toLocaleTimeString()}`;

            let cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                <h3>${post.title}</h3>
                <div>
                <p>${post.post}</p>
                </div>
                <p>${formattedDate}</p>
            `;

            cardContainer.appendChild(cardElement);

            cardElement.setAttribute('data-post-id', post.id);
            cardElement.addEventListener('click', function() { 
                let postId = this.dataset.postId;                
                localStorage.setItem('postId', postId);
                renderDisplayPage();      
            });
        });
    })
    .catch(error => {
        console.error('Nånting är fel:', error);
    });
} 


