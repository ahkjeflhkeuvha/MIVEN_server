const express = require('express')
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const user = require('./routes/users');
app.use('/users', user);

const admin = require('./routes/admins');
app.use('/admins', admin);


app.post('/users/save', (req, res)=>{
    let {q_1, q_2, q_3} = req.body
    pool.query('INSERT INTO apply_info (q_1, q_2, q_3) VALUES (?,?,?)', [q_1, q_2, q_3], (err, result)=>{
        if(err){
            console.log(err.message)
            res.status(500).json({ message : '제출 실패' })
        } else {
            res.status(200).json({ message : '제출 성공' })
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

app.listen(port, () => {
    console.log(`Example app listeing on port ${port}`)
});