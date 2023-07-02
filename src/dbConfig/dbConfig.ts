import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("DB CONNECTED");
        })
        connection.on("error", (err) => {
            console.log("DB CONNECTION ERROR: ", err);
            process.exit();
        })
    } catch (error) {
        console.log("ERR: ", error);
    }
}
