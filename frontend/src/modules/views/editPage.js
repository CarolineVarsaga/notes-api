import renderDisplayPage from "./displayPost.js";
import sidenav from "../sidenav.js";
import logOutBtn from "../logOutUser.js";
import printUserName from "../printUserName.js";
//===============================================================
let contentContainer = document.getElementById('contentContainer');

//==================================================
//===========   RENDER TEXT EDITOR PAGE   ==========
//================================================== 
function displayEditNotePage() {
    const htmlContentontent  = `
        <header>
            <h1 id="heading" class="heading">Anteckningar</h1>
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
                    <input type="text" id="title" class="title" placeholder="Rubrik">
                    <textarea id="textArea" class="textarea"></textarea>
                    </div>
                    <div class="save-btn-container">
                        <button id="updateBtn" class="save-btn btn">Uppdatera</button>
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
    let updateBtn = document.getElementById('updateBtn');
    updateBtn.addEventListener('click', updatePost);
}
//==================================================
//===============   UPDATE POST   ==================
//==================================================    
function updatePost() {  
    if (title.value.trim() === '' || textArea.value.trim() === '') {
        alert('Du saknar rubrik eller innehåll.')
        return; 
    } 
    let userId = localStorage.getItem('userId');
    let postId = localStorage.getItem('postId');

    let updatePost = {
        title: title.value,
        post: textArea.value,
        userId: userId, 
        postId: postId        
    }

    fetch('http://localhost:3000/update', {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(updatePost)
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('postId', data.postId);  
        postId = data.postId;
        renderDisplayPage(); 
    })
}
export default displayEditNotePage;


