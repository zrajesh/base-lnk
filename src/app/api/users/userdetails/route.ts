import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const { username } = reqBody;            
    
    try {
        const user = await User.findOne({username: username});
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const userData = {
            username: user.username,
            role: user.role,
            bio: user.bio,
            avatar: user.avatar,
            email: user.email,
            links: user.links,
            socialMedia: user.socialMedia
        }
        return NextResponse.json(userData, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }
}
