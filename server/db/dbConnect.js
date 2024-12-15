const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const uri = process.env.DATABASE_URI;
        await mongoose.connect(uri);
        console.log("Connected to DB!")
    } catch (error) {
        console.error(error);
    }

    process.on('SIGINT', () => {
        mongoose.connection.close();
        console.log("Database connection closed due to manual termination");
        process.exit(0);
    })
}

module.exports = dbConnect