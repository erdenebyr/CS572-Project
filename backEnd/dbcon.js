require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

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

}
module.exports = new dbconn();