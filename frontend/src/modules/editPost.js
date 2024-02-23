import displayNewNotePage from "./views/addPost.js";

//==================================================
//=================   EDIT POST   ==================
//================================================== 
export default function editPost(editPostBtn) {  //btn from printPosts
    editPostBtn.addEventListener('click', function() {
       
        let postId = this.dataset.postId;
        localStorage.setItem('postId', postId);

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
    });
}