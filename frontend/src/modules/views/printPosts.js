import editPost from "../editPost.js";
import renderDisplayPage from "./displayPost.js";
import sidenav from "../sidenav.js";
import logOutBtn from "../logOutUser.js";
import printUserName from "../printUserName.js";
//==================================================
//===========   RENDER ALL POSTS PAGE   ============
//================================================== 
export default function renderAllPosts() {
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
            <section class="all-posts-container">
                <div id="printAllPosts" class="print-all-posts"></div>
            </section>
        </section>
    `; 
    contentContainer.innerHTML = htmlContent; 
    sidenav();
    logOutBtn();
    printUserName(); 
    let printAllPosts = document.getElementById('printAllPosts');
    printPosts(printAllPosts); 
}

//==================================================
//================   PRINT POSTS   =================
//================================================== 
function printPosts(printAllPosts) {
    let userId = localStorage.getItem('userId');    

    fetch(`http://localhost:3000/post?userId=${userId}`) 
    .then(res => res.json())
    .then(data => {
      printAllPosts.innerHTML = ''; 

      data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
        });

        data.map(post => {
            let divPostContainer = document.createElement('div');
            divPostContainer.classList.add('post-div');
            divPostContainer.setAttribute('data-post-id', post.id);
            divPostContainer.addEventListener('click', function() { 
                let postId = this.dataset.postId;                
                localStorage.setItem('postId', postId);
                renderDisplayPage();      
            });
            
            let innerDiv = document.createElement('div');
            innerDiv.innerHTML = post.title;
            innerDiv.classList.add('text');
            
            divPostContainer.appendChild(innerDiv);

            let dateContainer = document.createElement('div');
            dateContainer.classList.add('date-container');

            let postDate = new Date(post.date);

            let dateText = document.createElement('p');
            dateText.textContent = `${postDate.toLocaleDateString()} ${postDate.toLocaleTimeString()}`;

            dateContainer.appendChild(dateText);

            divPostContainer.appendChild(dateContainer); 

            let editPostBtn = document.createElement('button')
            editPostBtn.innerText = 'Redigera';
            editPostBtn.classList.add('btn', 'edit-post-btn'); 
            editPostBtn.dataset.postId = post.id;
            editPost(editPostBtn);

            let editBtnContainer = document.createElement('div');
            editBtnContainer.classList.add('edit-btn-container'); 
            editBtnContainer.appendChild(divPostContainer);
            editBtnContainer.appendChild(editPostBtn);

            printAllPosts.appendChild(editBtnContainer);
        })
    })
}




