const express = require("express");
const cookieParser = require('cookie-parser');
const path = require("path");
const http = require("http");
const bodyParser = require('body-parser');
require('dotenv').config();
const Stripe = require('stripe')(process.env.SECRET_KEY);

require("./db/mongoConnect")


const usersR = require("./routes/users");
const spotifyR = require("./routes/spotify");
const artistsR = require("./routes/artists");
const albumsR = require("./routes/albums");
const tracksR = require("./routes/tracks");
const myPlylistR = require("./routes/myPlylist");
const plylistSpotifyR = require("./routes/plylistSpotify");
const tracksSpotufyPlR = require("./routes/tracksSpotufyPl");
const trackMyPlylistR = require("./routes/trackMyPlylist");
const stripeRoute = require("./routes/stripe");
const send = require('./routes/sendWhatsapp');

const app = express();
// דואג שכל מידע משתקבל או יוצא בברירת מחדל יהיה בפורמט ג'ייסון
app.use(express.json());
// להגדיר את תקיית פאבליק כתקייה של צד לקוח בשביל שנוכל לשים שם תמונות, ודברים של צד לקוח
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

// שניתן לבצע בקשה מדפדפן מכל דומיין ולא דווקא הדומיין של השרת שלנו
app.all('*', function(req, res, next) {
    if (!req.get('Origin')) return next();
    // * - הרשאה לכל הדומיינים לעשות בקשה
    res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-api-key');
    next();
});
var cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200'],
    credentials: true
}));
app.use("/", spotifyR);
app.use("/users", usersR);
app.use("/artists", artistsR)
app.use("/albums", albumsR)
app.use("/tracks", tracksR)
app.use("/plylistSpotify", plylistSpotifyR)
app.use("/tracksSpotufyPl", tracksSpotufyPlR)
app.use("/myPlylist", myPlylistR);
app.use("/trackMyPlylist", trackMyPlylistR);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/payment", stripeRoute);
// app.use("/send", send);







// מייצר סרבר שמשתמש באפ של האקספרס
const server = http.createServer(app);
let port = process.env.PORT || "9000";
// מאזין או לפורט של השרת שאנחנו נמצאים בו או 3000
server.listen(port);