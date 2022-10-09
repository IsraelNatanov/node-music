require('dotenv').config();

exports.config = {
    secrtKey:process.env.SECRET_KEY,
    tokenSecret:process.env.TOKEN_SECRET,
    userDb:process.env.USER_DB,
    passDb:process.env.PASS_DB
    
}