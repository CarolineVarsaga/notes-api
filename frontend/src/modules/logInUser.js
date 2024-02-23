import displayNewNotePage from "./views/addPost.js";
import renderHomePage from "./views/homePage.js";
//==================================================
//=================   LOG IN USER   ================
//================================================== 
export default function logInUser() {
    const userEmail = document.getElementById('userEmail'); 
    const userPassword = document.getElementById('userPassword'); 
    
    if (userEmail.value.trim() === '' || userPassword.value.trim() === '') {
        alert('Fyll i dina inloggningsuppgifter');
        return; 
      }

    let logIn = {
        userEmail: userEmail.value,
        userPassword: userPassword.value
    }
    
    fetch('http://localhost:3000/users/login', {
        method: 'POST', 
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(logIn)
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === 'inloggad') {
            localStorage.setItem('userId', data.user);
            localStorage.setItem("loggedIn", "true");
            userEmail.value = ''; 
            userPassword.value = ''; 
            contentContainer.innerHTML = ''; 

            renderHomePage(); 
        } else if (data.message === 'fel användarnamn eller lösenord') {
            alert('Fel användarnamn eller lösenord');
        } else {
            alert('Okänt fel, försök igen?');
        }
    })
}