import renderAllPosts from "./views/printPosts.js";

//==================================================
//================   DELETE POST   =================
//================================================== 
export default function deletePost(deletePostBtn) {
    let printPost = document.getElementById('printPost');
    deletePostBtn.addEventListener('click', function() {
        document.getElementById('popup').style.display = 'block';

        document.getElementById('closePopupBtn').addEventListener('click', function() {
            document.getElementById('popup').style.display = 'none';
        });
    })
    
    const deleteBtn = document.getElementById('deleteBtnPopup');
    deleteBtn.addEventListener('click', function () {
        document.getElementById('popup').style.display = 'none';
        let postId = localStorage.getItem('postId');    
        
        fetch(`http://localhost:3000/post/${postId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data =>{
            localStorage.removeItem('postId');
            printPost.innerHTML = ''; 
            renderAllPosts(); 
        })        
    })
} 