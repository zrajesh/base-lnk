import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt_decode from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    const userName = request.nextUrl.pathname.replace('/api/', '');
            
    try {
        const user = await User.findOne({username: userName});
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
