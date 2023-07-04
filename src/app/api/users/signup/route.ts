import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        // Check is user exist
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({error: "user already exists"}, {status: 400})
        }
        // hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        return NextResponse.json({
            message: `${username} account created successfully, Please log in`,
            success: true
        }, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }
}
