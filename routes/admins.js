const pool = require('../db/db');
const router = require('express').Router();

// 관리자 로그인 api
router.post('/login', (req, res) => {
    const { password } = req.body;

    const real_password = "미베니들012사랑해"

    if (password === real_password) {
        return res.status(200).json({ message: '로그인 성공' });
    } else {
        return res.status(401).json({ message: '인증 실패' });
    }
});

// 지원서 내용 모두 불러오는 api
router.get('/', (req, res)=>{
	pool.query('SELECT * FROM apply_info', (err, result) => {
        if(err){
            console.error(err.message)
            res.status(500).json({ message : '유저 정보 입력 실패' })
        } else {
            res.status(200).json({ message : '유저 정보 입력 성공' , result})
        }
    })
})

module.exports = router;