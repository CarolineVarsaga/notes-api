import renderDisplayPage from "./displayPost.js";
import sidenav from "../sidenav.js";
import logOutBtn from "../logOutUser.js";
import printUserName from "../printUserName.js";
import renderAllPosts from "./printPosts.js";
//===============================================================
let contentContainer = document.getElementById('contentContainer');

//==================================================
//===========   RENDER TEXT EDITOR PAGE   ==========
//================================================== 
function displayNewNotePage() {
    const htmlContentontent  = `
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
            <section class="editor">                
                <div id="formContainer" class="form-container">
                    <div class="text-title-container">
                    <input type="text" id="title" class="title" placeholder="Rubrik" maxlength="55">
                    <textarea id="textArea" class="textarea" maxlength="6000"></textarea>
                    </div>
                    <div class="save-btn-container">
                        <button id="abortBtn" class="abort-btn btn">Avbryt</button>
                        <button id="saveBtn" class="save-btn btn">Spara</button>                        
                    </div>                              
                </div>
            </section>
        </section>
    `;
   
    contentContainer.innerHTML = htmlContentontent; 
    sidenav();
    printUserName(); 
    logOutBtn(); 
    tinymce.remove(); //remove latest instance so it can render again
    tinymce.init({
        selector: "#textArea", 
        plugins: "code",
        toolbar: "fontsize styles | forecolor backcolor | bold italic underline | alignleft aligncenter alignright",
        setup: function(editor) {
            editor.on("change", function() {
                editor.save();
            })
        }
    });
    let saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener('click', saveNewPost);

    let abortBtn = document.getElementById('abortBtn'); 
    abortBtn.addEventListener('click', abort);    
}

//==================================================
//===========   SAVE NEW / UPDATE NOTE   ===========
//==================================================    
function saveNewPost() {  
    if (title.value.trim() === '' || textArea.value.trim() === '') {
        alert('Du saknar rubrik eller innehåll.')
        return; 
    }        
    let userId = localStorage.getItem('userId');
    let postId = localStorage.getItem('postId');
    // if someone changes the html, its still in the programming
    let maxLength = 55; 
    let maxLengthTextArea = 6000;
   
    if (title.value.length > maxLength) {
        title.value = title.value.slice(0, maxLength);
    } 

    if (textArea.value.length > maxLengthTextArea) {
        textArea.value = textArea.value.slice(0, maxLengthTextArea);
    } 

    let savePost = {
        title: title.value,
        post: textArea.value,
        userId: userId, 
        postId: postId        
    } 
   
    let method = 'POST';
    let url = 'http://localhost:3000/post';    //if new post - save

      if (postId) {
        method = 'POST';
        url = 'http://localhost:3000/update';   //if current post - update
        savePost.postId = postId; 
    } 

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(savePost)
    })
    .then(res => res.json())
    .then(data =>{
        localStorage.setItem('postId', data.postId);  
        postId = data.postId;
        renderDisplayPage(); 
    })
}
//==================================================
//==================   ABORT   =====================
//==================================================  
function abort() {
    localStorage.removeItem('postId');
    localStorage.removeItem('latestPostId');
    renderAllPosts();  
}
export default displayNewNotePage;