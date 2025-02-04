const {connect} = require("mongoose");

const connectDatabase = async(url) => {
    try {
        await connect(url);
        console.log("Database connected successfully")
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = connectDatabase;