require('dotenv').config();

const mongoose = require('mongoose');

class dbconn {

    constructor() {
        mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true })
            .then(() => {
                console.log('Connected to DB')
            })
            .catch(() => {
                console.log('Connection to DB Failed')
            });
    }

    checkJWT(){
        return true;
    }

    createJWT(){

    }
}
module.exports = new dbconn();