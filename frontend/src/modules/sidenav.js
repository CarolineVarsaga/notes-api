import renderHomePage from "./views/homePage.js";
import renderAllPosts from "./views/printPosts.js";
import displayNewNotePage from "./views/addPost.js";

//==================================================
//==========   SIDE NAVIGATION BUTTONS   ===========
//================================================== 
export default function sidenav() {
    const homeBtn = document.getElementById('homeBtn'); 
    const allNotesBtn = document.getElementById('allNotesBtn'); 
    const newNoteBtn = document.getElementById('newNoteBtn'); 

    homeBtn.addEventListener('click', displayHomePage);
    allNotesBtn.addEventListener('click', displayAllPosts);
    newNoteBtn.addEventListener('click', displayNotePage);
}

function displayHomePage() {
    localStorage.removeItem('postId');
    localStorage.removeItem('latestPostId');
    renderHomePage();
}

function displayAllPosts() {
    localStorage.removeItem('postId');
    localStorage.removeItem('latestPostId');
    renderAllPosts(); 
}

function displayNotePage() {
    localStorage.removeItem('postId');
    localStorage.removeItem('latestPostId');
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
        }
    });
}