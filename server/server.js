require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:8080", // your Vite frontend
}));
app.use(express.json());

app.post("/contact", async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            console.log("❌ Missing fields");
            return res.status(400).json({ error: "Missing fields" });
        }

        console.log("Creating transporter...");

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // must be false for 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log("Verifying SMTP connection...");

        await transporter.verify();
        console.log("✅ SMTP Connected");

        console.log("Sending email...");

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Portfolio message from ${name}`,
            replyTo: email,
            text: message,
            html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
        });

        console.log("✅ EMAIL SENT:", info.response);

        res.json({ success: true });

    } catch (error) {
        console.error("❌ FULL SMTP ERROR BELOW:");
        console.error(error);
        res.status(500).json({ error: "Email failed", details: error.message });
    }
});

app.listen(5000, () => {
    console.log("🚀 SMTP Server running on port 5000");
});