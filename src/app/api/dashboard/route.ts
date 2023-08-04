import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt_decode from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";


connectDB();

interface DecodedToken {
    id: string;
    username: string;
    email: string;
}
  
export async function POST (request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userToken } = reqBody;
        const decoded_token = jwt_decode(userToken) as DecodedToken;
        const userEmail = decoded_token.email;
        const user = await User.findOne({email: userEmail});
        const userData = {
            username: user.username,
            role: user.role,
            avatar: user.avatar,
            email: user.email,
            links: user.links,
            totalLinks: user.links.length
        }
        return NextResponse.json(userData, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error}, {status: 500});
    }
}

export async function GET (request: NextRequest) {}
