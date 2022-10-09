// db connect
const mongoose = require('mongoose');
const {config}= require("../config/secret")
main().catch(err => console.log(err));

async function main() {
    console.log(config.userDb);
    await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.3ieu4.mongodb.net/idf`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("mongo connected idf")
}