import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        // Check if user exist
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({error: "user doest not exists"}, {status: 400})
        }
        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }
        // Create a user token
        const userTokenDetails = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(userTokenDetails, process.env.TOKEN_SECRET!, {expiresIn: "2d"});
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        });
        response.cookies.set("token", token, {httpOnly: true});
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error}, {status: 500});
    }
}
