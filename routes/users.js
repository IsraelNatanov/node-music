const express = require("express");
// יודע להצפין סיסמאות
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateUser, UserModel, validateLogin, genToken } = require("../models/userModel");
const { auth } = require("../middlewares/auth");
const { default: axios } = require("axios");
const { TokenModel } = require("../models/tokenModel");
const { fileImgUpload } = require("../util/uploadFile");

let refrchTokens = [];

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ msg: "Users work" });
})



// auth - פונקציית מידל וואר לראוטר שקודם עובר דרכה

router.get("/userInfo", auth, async(req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "There is probelm , try again later", err })

    }
})



router.post("/", async(req, res) => {
    // לבדוק וולדזציה למידע שמגיע מהבאדי
    let validBody = validateUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        // להכין את השמירת מידע
        let user = new UserModel(req.body);
        // להצפין את הסיסמא
        user.password = await bcrypt.hash(user.password, 10);


        // ולהגדיר את הרול כיוזר רגיל
        user.role = "user";
        // לשמור את הרשומה
        await user.save();
        // מסתיר מהצד לקוח איך הסיסמא הוצפנה
        user.password = "******";
        // להחזיר מידע לצד לקוח
        res.status(201).json(user)
    } catch (err) {
        if (err.code == 11000) {
            // שגיאה אם המייל כבר קיים במסד נתונים
            return res.status(400).json({ msg: "Email already in system", code: 11000 })
        }
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later", err })
    }

})


router.post("/login", async(req, res) => {
    let validBody = validateLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        // בדיקה אם האימייל קיים בכלל בקולקשן
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            // 401 - שגיאת אבטחה
            return res.status(401).json({ msg: "Email/user not found" });
        }
        // אם הסיסמא שנשלחה מהבאדי תואמת לסיסמא המוצפנת בקולקשן
        let validPassword = await bcrypt.compare(req.body.password, user.password)



        if (!validPassword) {
            // 401 - שגיאת אבטחה
            return res.status(401).json({ msg: "Password worng" });
        }

        const refreshToken = jwt.sign({
            id: user._id
        }, "refresh_secret", { expiresIn: '1w' });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        });

        const expired_at = new Date();
        expired_at.setDate(expired_at.getDate() + 7);
        let token = new TokenModel()
        token.user_id = user._id,
            token.token = refreshToken,
            token.expired_at = expired_at



        token.save();
        // נדווח שהכל בסדר בהמשך נשלח טוקן
        let newToken = genToken(user._id)

        res.json({ token: newToken })


    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }

});

router.post("/refrechToken", async(req, res) => {

    try {
        const refreshToken = req.cookies['refreshToken'];
        

        const payload = jwt.verify(refreshToken, "refresh_secret");

        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const dbToken = await TokenModel.findOne({
            user_id: payload.id,
        });

        if (!dbToken) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

      
        let token = genToken(payload.id)

        res.send({
            token
        })
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
})


router.post("/logout", async(req, res) => {

    const refreshToken = req.cookies['refreshToken'];

    await TokenModel.deleteOne({token: refreshToken});

    res.cookie('refreshToken', '', {maxAge: 0});

    res.send({
        message: 'success'
    });
})
router.post("/upload",auth, async(req,res) => {
    try{
        let data = await fileImgUpload(req,"myFile","/users/"+req.tokenData._id,5,['.jpg','.png']);
        if(data.fileName){
            let updatedata = await UserModel.updateOne({_id: req.tokenData._id},
                 {img_url:data.fileName});
            res.json(updatedata)
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json(err)
    }
  
})

module.exports = router;