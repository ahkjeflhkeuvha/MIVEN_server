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

app.post('/users/inform', (req, res)=>{
	let {name, student_no, phone_no, email} = req.body
	pool.query('INSERT INTO apply_info (name, student_no, phone_no, email) VALUES (?,?,?,?)', [name, student_no, phone_no, email], (err, result) => {
        if(err){
            console.error(err.message)
            res.status(500).json({ message : '유저 정보 입력 실패' })
        } else {
            res.status(200).json({ message : '유저 정보 입력 성공' })
        }
    })
})

app.post('/users/save', (req, res)=>{
    let {q_1, q_2, q_3} = req.body
    pool.query('INSERT INTO apply_info (q_1, q_2, q_3) VALUES (?,?,?)', [q_1, q_2, q_3], (err, result)=>{
        if(err){
            console.log(err.message)
            res.status(500).json({ message : '제출 실패' })
        } else {
            res.status(200).json({ message : '제출 성공'  })
        }
    })
})

app.patch('/users/presave', (req, res)=>{
    let {q_1, q_2, q_3} = req.body
    pool.query('UPDATE apply_info SET q_1=?, q_2=?, q_3=?', [q_1, q_2, q_3], (err, result)=>{
        if(err){
            console.log(err.message)
            res.status(500).json({ message : '임시저장 실패' })
        } else {
            res.status(200).json({ message : '임시저장 성공' })
        }
    })
})

app.listen('3000', (req, res)=>{
    console.log('connected!!!')
})