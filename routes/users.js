const pool = require('../db/db');
const router = require('express').Router();
const crypto = require('crypto');
const hashedPassword = require('../middlewares/hashedPasswords');

//회원가입
router.post('/join', hashedPassword, (req, res) => {
	let {name, student_no, phone_no, email, is_dormitory} = req.body
    const password = req.password;
	pool.query('INSERT INTO apply_info (name, student_no, phone_no, email, is_dormitory, password, is_submit) VALUES (?,?,?,?,?,?)', [name, student_no, phone_no, email, is_dormitory, password, 0], (err, result) => {
        if(err){
            console.error(err.message)
            res.status(500).json({ message : '유저 정보 입력 실패' })
        } else {
            res.status(200).json({ message : '유저 정보 입력 성공' })
        }
    })
})

// 로그인
router.post('/login', (req, res) => {
    const { email, password } = req.body
    const derivedKey = crypto.pbkdf2Sync(password, process.env.SALT, 8931, 64, 'sha512');
    let hashedPassword = derivedKey.toString('hex');

    pool.query('SELECT * FROM apply_info WHERE password = ? AND email = ?', [hashedPassword, email], (err, result) => {
        if(err) {
            console.error(err.message)
            res.status(500).json({ message : '로그인 실패' })
        } else {
            res.status(200).json({ message : '로그인 성공' })
        }
    })
})

//지원서 저장
router.post('/save', (req, res)=>{
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

//지원서 임시저장
router.patch('/presave', (req, res)=>{
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


module.exports = router;