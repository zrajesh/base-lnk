import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";


interface sendEmailPropType {
    email: string;
    emailType: string;
    userId: string;
}

const sendEmail = async function ({email, emailType, userId}: sendEmailPropType) {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY_EMAIL") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000}
            )
        } else if (emailType === "RESET_PASSWORD") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000}
            )
        }

        const transporter = nodemailer.createTransport({
            host: process.env.NODE_MAILER_HOST,
            port: Number(process.env.NODE_MAILER_PORT),
            auth: {
              user: process.env.NODE_MAILER_USER,
              pass: process.env.NODE_MAILER_PASS
            }
        });

        const email_subject = emailType === "VERIFY_EMAIL" ? "Verify your email" : "Reset your password";
        const mailOptions = {
            from: "leadflow@gmail.com",
            to: email,
            subject: email_subject,
            html: `<p>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${email_subject}
            Or click the link below <br>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </a>
            </p>`
        }
        const mail_response = await transporter.sendMail(mailOptions);
        return mail_response;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default sendEmail;