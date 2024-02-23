//==================================================
//==============   PRINT USER NAME   ===============
//================================================== 
export default function printUserName() {
    let userId = localStorage.getItem('userId');

    fetch(`http://localhost:3000/users/${userId}`)
    .then(res => res.json())
    .then(data => {
        let userName = data[0].userName;
        let loggedInText = document.createElement('p');
        loggedInText.textContent = `${userName}`;
        let headerContainer = document.querySelector('.header-container');      
        let logOutBtn = document.getElementById('logOutBtn');
        headerContainer.insertBefore(loggedInText, logOutBtn);
    });
}
