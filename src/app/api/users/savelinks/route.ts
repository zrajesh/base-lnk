import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, links } = reqBody;
        console.log(email);
        
        const user = await User.findOne({email});
        
        // Retrieve existing links and add new links
        if (user.links.length > 0) {
            const updatedLinks = [...user.links, links];
            // Update the links array in the user document
            user.links = updatedLinks;
        } else {
            user.links = links;
        }
        await user.save();
        return NextResponse.json({
            message: `link saved successfully!`,
            success: true
        }, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }
}
