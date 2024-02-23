const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const connection = require('./lib/conn');
const usersRouter = require('./routes/users'); 

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/users', usersRouter); 

//=================================================
//================ GET ALL POSTS ==================
//=================================================
app.get('/post', (req, res) => {
    let userId = req.query.userId; 

    connection.connect((err) => {
        if (err) console.log(err, 'error');

        let query = 'SELECT * FROM post WHERE userId = ? AND deleted = 0';
        let values = [userId];

        connection.query(query, values, (err, data) => {
            if (err) console.log(err, 'error');

            res.status(200).json(data);
        })
    })
})
//=================================================
//================= UPDATE POSTS ==================
//=================================================
app.post('/update', (req, res) => {
    let postId = req.body.postId; 
    let newTitle = req.body.title;
    let newPost = req.body.post;

    connection.connect((err) => {
        if (err) console.log(err, 'error');

        let query = 'UPDATE post SET title=?, post=? WHERE id=?';
        let values = [newTitle, newPost, postId];        

        connection.query(query, values, (err, data) => {
            if (err) console.log(err, 'error');

            res.json({ postId: postId, data: data });
        })
    })
})
//=================================================
//================ SPECIFIC POSTS =================
//=================================================
app.get('/post/:postId', (req, res) => {
    let postId = req.params.postId; 

    connection.connect((err) => {
        if (err) console.log(err, 'error');

        let query = 'SELECT * FROM post WHERE id = ?';
        let values = [postId];

        connection.query(query, values, (err, data) => {
            if (err) console.log(err, 'error');

            res.json(data[0]); 
        })
    })
})
//=================================================
//=================== NEW POST ====================
//=================================================
app.post('/post', (req, res) => {

    let title = req.body.title;
    let post = req.body.post; 
    let userId = req.body.userId; 

    connection.connect((err) => {
        if (err) console.log(err, 'error');

        let query = 'INSERT into post (title, post, userId) VALUES (?, ?, ?)';
        let values = [title, post, userId];

        connection.query(query, values, (err, data) => {
            if (err) console.log(err, 'error');

            res.json({message: 'post sparad', postId: data.insertId});
        })
    })
})
//=================================================
//================= DELETE POST ===================
//=================================================
app.delete('/post/:postId', (req, res) => {
    let postId = req.params.postId; 

    connection.connect((err) => {
        if (err) console.log(err, 'error');

        let query = 'UPDATE post SET deleted=1 WHERE id=?'
        let values = [postId];

        connection.query(query, values, (err, data) => {
            if (err) console.log(err, 'error');

            res.json({message: 'post raderad'});
        })
    })
})




module.exports = app;
