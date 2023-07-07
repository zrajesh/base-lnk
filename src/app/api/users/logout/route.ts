import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connectDB();
export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        })
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
        return response;
    } catch (error) {
        NextResponse.json({error: error}, {status: 500});
    }
}
