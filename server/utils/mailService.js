import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendRenewalAlert = async (userEmail, subscription) => {
  try {
    const mailOptions = {
      from: `"Finora Watchdog" <${process.env.SMTP_FROM}>`,
      to: userEmail,
      subject: `⚠️ Action Required: ${subscription.name} renews soon`,
      text: `Hi,\n\nYour subscription to ${subscription.name} (${subscription.currency} ${subscription.amount}) is due for renewal on ${new Date(subscription.dueDate).toDateString()}.\n\nEnsure your card has sufficient funds to avoid service interruption.\n\n- Finora`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Renewal alert sent to ${userEmail} for ${subscription.name}`);
  } catch (error) {
    console.error("Failed to send renewal alert email:", error);
  }
};
