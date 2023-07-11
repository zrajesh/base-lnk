import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const user_id = await getDataFromToken(request);
        const user = await User.findOne({_id: user_id}).select("-password");
        return NextResponse.json({
            message: "user found",
            data: user
        });
    } catch (error) {
        return NextResponse.json({error: error}, {status: 400})
    }
}
