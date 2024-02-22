const express = require('express')
const mysql = require('mysql')

const app = express()

app.use(express.json())

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '591006',
    database : 'users'
})

app.post('/check', (req, res)=>{  
    let {name, age, gender, sick} = req.body

    pool.query('INSERT INTO user (name, age, gender, sick) VALUES (?,?,?,?)', [name, age, gender, sick], (err, result)=>{
        if(err){
            res.status(500).json({ message : err })
        } else {
            res.status(200).json({ message : '성공', name, age, gender, sick })
        }
    })
})

app.get('/check', (req, res)=>{
    let {name, age, gender, sick} = req.body

    pool.query('SELECT * FROM user', (err, result)=>{
        if(err) {
            res.status(500).json({ message : err })
        } else {
            res.status(200).json({ message : '성공', name, age, gender, sick})
        }
    })
})

app.patch('/check', (req, res)=>{
    pool.query('DELETE FROM user WHERE age < 18 OR sick = 1', (err, result)=>{
        if(err){
            res.status(500).json({ message : err })
        } else {
            res.status(200).json({ message : '성공' })
        }
    })
})

app.listen('3000', (req, res)=>{
    console.log('connected~!!!!')
})