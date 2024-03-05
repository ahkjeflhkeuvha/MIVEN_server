const crypto = require('crypto');

const hashedPassword = async (req, res, next) => {
    const { password } = req.body;
    try {
        crypto.pbkdf2(password, process.env.SALT, 8931, 64, 'sha512', (err, derivedKey) => {
            if (err) {
                console.log("fdsfsaf");
                console.log(err);
                res.status(500).json({ message: '서버 오류' });
            } else {
                const hashedPassword = derivedKey.toString('hex');
                req.password = hashedPassword;
                next();
            }
        })
    } catch(error){
        console.log(error)
        res.status(500).json({ message: '서버 오류' });
    }
}

module.exports = hashedPassword; 