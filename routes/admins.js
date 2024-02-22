const pool = require('../db/db');
const router = require('express').Router();

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