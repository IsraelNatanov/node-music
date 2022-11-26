const jwt = require("jsonwebtoken");


exports.auth = (req,res,next) => {
  
  let token = req.header('Authorization')?.split(" ")[1] || "";
  // בודק אם בכלל נשלח בהידר קוד של טוקן
  if(!token){
    return res.status(401).send({
      message: 'unauthenticated'
  });
  }
  try{
    // בדיקה אם הטוקן בתוקף או תקין ומקודד את המידע בתוכו
    let decodeToken =  jwt.verify(token,"MonkeysSecret");
    // מכניס לריק מאפיין שמכיל את המידע בטוקן
    // וכך גם לפונקציה הבאה יהיה את היכולת לדבר איתו
    req.tokenData = decodeToken;
    // next - לעבור לפונקציה הבאה בשרשור של הרואטר
    next();
  }
  catch(err){
    return res.status(401).json({msg:"Token invali or expired 2222"})
   }
}