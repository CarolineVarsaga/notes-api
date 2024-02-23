import renderLogin from "./modules/views/logInPage.js";
import displayNewNotePage from "./modules/views/addPost.js";
import renderAllPosts from "./modules/views/displayPost.js";
import renderDisplayPage from "./modules/views/displayPost.js";

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
