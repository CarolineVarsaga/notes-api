import renderLogin from "./views/logInPage.js";

//==================================================
//================   CREATE USER   =================
//================================================== 
export default function createUser(createUserBtn) {
    const userName = document.getElementById('createUserName');
    const userEmail = document.getElementById('createUserEmail');
    const userPassword = document.getElementById('createUserPassword');

    createUserBtn.addEventListener("click", () => {
        if (userName.value.trim() === '' || userEmail.value.trim() === '' || userPassword.value.trim() === '') {
        alert('Please fill in all fields');
        return; 
        }
        let sendUser = {
            userName: userName.value,            
            userEmail: userEmail.value,
            userPassword: userPassword.value
        }
    
        fetch("http://localhost:3000/users", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendUser)
        })
        .then(res => res.json())
        .then(data => {
            userEmail.value = ""; 
            userName.value = "";
            userPassword.value = ""; 

            alert("Konto skapat. Du kan nu logga in!")

            renderLogin(); 
        })
        .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while saving user data");
        });
    })
}