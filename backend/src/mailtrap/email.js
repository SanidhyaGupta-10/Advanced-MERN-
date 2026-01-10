import { mailtrapClient, sender } from "../mailtrap/mailtrap.congif.js";
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";


export const senderVerificationEmail = async (email, verificationToken) => {

     const recipient = { email: email }

    try {
        const res = await mailtrapClient.send({
            from: sender,
            to:[recipient],
            subject: "Please verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        })

        console.log("Verification email sent:", res);
    } catch (error) {
        console.error("Error sending verification email:", error);

        throw new Error(`Failed to send verification email: ${error.message}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = { email: email }
    try {
        await mailtrapClient.send({
            from: sender,
            to: [recipient],
            template_uuid: "c05bdd2b-59bb-4454-a825-2fbccef290f4",
            template_variables: {
                "company_info_name": "Void",
                name: name,
            },
        });

        console.log("Welcome email sent successfully")

    } catch (error) {
        console.error("Error sending welcome email:", error);

        throw new Error(`Failed to send welcome email: ${error.message}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = { email: email }
    try {
        const res = await mailtrapClient.send({
            from: sender,
            to: [recipient],
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        })
    } catch (err) {
        console.error("Error sending password reset email:", err);

        throw new Error(`Failed to send password reset email: ${err.message}`);
    }
}

export const sendResetPassword = async (email) => {
    const recipient = { email: email }
    try {
        const res = await mailtrapClient.send({
            from: sender,
            to: [recipient],
            subject: "Password Reset",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        })


    } catch (err) {
        console.error("Error sending password reset email:", err);
    }
}