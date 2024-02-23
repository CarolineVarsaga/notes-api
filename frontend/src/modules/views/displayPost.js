import deletePost from "../deletePost.js";
import displayNewNotePage from "./addPost.js";
import sidenav from "../sidenav.js";
import logOutBtn from "../logOutUser.js";
import printUserName from "../printUserName.js";
//==================================================
//==========   RENDER DISPLAY NOTE PAGE   ==========
//================================================== 
export default function renderDisplayPage() {
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
        <div id="printPostContainer">
            <div id="printPost" class="print-post"></div>
            <div class="edit-btn-container">
                <button id="deleteBtn" class="delete-btn">Radera anteckning</button>
                <button id="editBtn" class="edit-btn btn">Redigera</button> 
            </div>
        </div>

        <div id="popup" class="popup">
            <div class="popup-content">
                <h2>Radera anteckning</h2>
                <p>Är du säker på att du vill radera anteckningen? <br>Går ej att ångra.</p>
                <div class="btn-container">
                    <button id="deleteBtnPopup" class="btn delete-btn-popup">Radera</button>
                    <button id="closePopupBtn" class="btn close-btn">Avbryt</button>     
                </div>                   
            </div>
        </div>
    `;
    contentContainer.innerHTML = htmlContent; 
    sidenav();
    logOutBtn();
    printUserName();
    printOutPost(); 

    const deletePostBtn = document.getElementById('deleteBtn'); 
    deletePost(deletePostBtn); 

    const editBtn = document.getElementById('editBtn'); 
    editBtn.addEventListener('click', editCurrentPost);
} 

//==================================================
//=============   EDIT CURRENT POST   ==============
//================================================== 
function editCurrentPost() {
    let postId = localStorage.getItem('postId');
    
    fetch(`http://localhost:3000/post/${postId}`)
    .then(res => res.json())
    .then(data =>{
    displayNewNotePage(); 
    tinymce.remove();     
    tinymce.init({
        selector: "#textArea", 
        plugins: "code",
        toolbar: "fontsize styles | forecolor backcolor | bold italic underline | alignleft aligncenter alignright",
        setup: function(editor) {
            editor.on("change", function() {
                editor.save();
            })
        }, 
        init_instance_callback:function(editor) {
            editor.setContent(data.post);
        }
    });
    let title = document.getElementById('title'); 
    title.value = data.title; 
    tinymce.get('textArea').setContent(data.post);
    })
}

//==================================================
//================   PRINT POST   ==================
//================================================== 
function printOutPost() {  
    let printPost = document.getElementById('printPost');
    let postId = localStorage.getItem('postId'); 

    fetch(`http://localhost:3000/post/${postId}`)
    .then(res => res.json())
    .then(post => {       
        let timestamp = document.createElement('div');
        timestamp.classList.add('timestamp-container');
        let postDate = new Date(post.date);
        let dateText = document.createElement('p');
        let postText = document.createElement('div');
        let postTitle = document.createElement('div');
    
        dateText.textContent = `${postDate.toLocaleDateString()} ${postDate.toLocaleTimeString()}`;
        dateText.classList.add('timestamp'); 
    
        timestamp.appendChild(dateText);
        printPost.appendChild(timestamp);
    
        postText.innerHTML = post.post;              
        printPost.appendChild(postText);
    
        postTitle.classList.add('post-title');
        postTitle.textContent = post.title;
    
        timestamp.insertBefore(postTitle, dateText);
        
        localStorage.setItem('postId', post.id); 
            
    })
    .catch(error => {
        console.error('Nånting är fel:', error);
    });
}