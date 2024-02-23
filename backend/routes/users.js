const express = require('express');
const router = express.Router();
const cors = require('cors');
const connection = require('../lib/conn');
const CryptoJS = require('crypto-js');  
require('dotenv').config();

router.use(cors()); 

//=================================================
//============== GET SPECIFIC USER ================
//=================================================
router.get('/:userId', (req, res) => {
  let userId = req.params.userId; 

  connection.connect((err) => {
    if (err) console.log(err, 'error');

    let query = 'SELECT userName FROM user WHERE userId = ?';
    let values = [userId];

    connection.query(query, values, (err, data) => {
      if (err) console.log(err, 'error');
      
      res.status(200).json(data); 
    })
  })
}) 
//=================================================
//================= CREATE USER ===================
//=================================================
router.post('/', (req, res) => {
  const salt = process.env.SALT_KEY;

  let userName = req.body.userName; 
  let userPassword = req.body.userPassword;
  let userEmail = req.body.userEmail; 

  const encryptedPassword = CryptoJS.AES.encrypt(userPassword, salt).toString(); 

  connection.connect((err) => {
    if (err) console.log(err, 'error');

    let query = 'INSERT into user ( userName, userPassword, userEmail) VALUES (?, ?, ?)';
    let values = [userName, encryptedPassword, userEmail];

    connection.query(query, values, (err, data) => {
      if (err) console.log(err, 'error');

      res.status(200).json({message: 'user sparad'});
    })
  })
})
//=================================================
//================= LOG IN USER ===================
//=================================================
router.post('/login', (req, res) => {
  const salt = process.env.SALT_KEY;

  let userEmail = req.body.userEmail; 
  let userPassword = req.body.userPassword;   
  
  connection.connect((err) => {
    if (err) console.log(err, 'error');
  
    let query = 'SELECT * FROM user WHERE userEmail = ?';
    let values = [userEmail];
  
    connection.query(query, values, (err, data) => {
      if (err) console.log(err, 'error');
  
      if (data.length > 0) {
        console.log('user', data[0]);
        const decryptedPassword = CryptoJS.AES.decrypt(data[0].userPassword, salt).toString(CryptoJS.enc.Utf8); 
        if (decryptedPassword === userPassword) { 
          res.status(200).json({user: data[0].userId, message: 'inloggad'})
        } else {
          res.status(401).json({message: 'fel användarnamn eller lösenord'});
      }
      } else {
        res.status(401).json({message: 'fel användarnamn eller lösenord'});
      }      
    })
  })  
})


module.exports = router;
