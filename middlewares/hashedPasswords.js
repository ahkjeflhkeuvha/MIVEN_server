const crypto = require('crypto');

const hashedPassword = async (req, res, next) => {
    const { password } = req.body;
    try {
        // pbkdf2 메서드의 인자 : 비밀번호, 솔트(암호화 키), 반복 횟수, 생성될 해시의 길이, 해시 알고리즘
        crypto.pbkdf2(password, process.env.SALT, 8931, 64, 'sha512', (err, derivedKey) => {
            if (err) {
                res.status(500).json({ message: '서버 오류' });
            } else {
                const hashedPassword = derivedKey.toString('hex');
                req.password = hashedPassword;
                next();
            }
        })
    } catch(error){
        res.status(500).json({ message: '서버 오류' });
    }
}

module.exports = hashedPassword; 