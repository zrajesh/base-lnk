import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, username, bio, avatar } = reqBody;
        
        // Check is user exist
        const user = await User.findOne({email});
        // Save new user profile data
        user.username = username;
        user.bio = bio;
        user.avatar = avatar;
        await user.save();

        return NextResponse.json({
            message: `${username} data saved successfully!`,
            username: username,
            success: true
        }, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }
}
