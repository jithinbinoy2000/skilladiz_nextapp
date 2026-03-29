import nodemailer from "nodemailer";

function createTransport() {
  if (process.env.EMAIL_SERVER) {
    return nodemailer.createTransport(process.env.EMAIL_SERVER);
  }
  // Fallback: SMTP config from individual env vars
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

/**
 * Send a booking confirmation receipt to the gamer.
 */
export async function sendBookingConfirmation({
  toEmail,
  toName,
  gameTitle,
  date,
  startTime,
  endTime,
  bookingId,
  amountPaid,
}) {
  const from = process.env.EMAIL_FROM || '"Skilladiz" <noreply@skilladiz.com>';
  const transporter = createTransport();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: sans-serif; background: #0a0a0a; color: #f1f1f1; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 40px auto; background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #7c3aed, #db2777); padding: 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; letter-spacing: 0.15em; text-transform: uppercase; }
    .body { padding: 32px; }
    .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
    .label { color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
    .value { font-size: 14px; font-weight: 600; }
    .badge { display: inline-block; background: rgba(34,197,94,0.15); color: #4ade80; border: 1px solid rgba(34,197,94,0.3); border-radius: 999px; padding: 4px 14px; font-size: 12px; margin-top: 20px; }
    .footer { padding: 20px 32px; text-align: center; font-size: 11px; color: rgba(255,255,255,0.3); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Skilladiz</h1>
      <p style="margin:8px 0 0; opacity:0.8; font-size:14px;">Booking Confirmed</p>
    </div>
    <div class="body">
      <p>Hey ${toName},</p>
      <p>Your booking is confirmed! See you at the arena.</p>
      <span class="badge">✓ Confirmed</span>
      <div style="margin-top:24px;">
        <div class="row"><span class="label">Booking ID</span><span class="value" style="font-family:monospace;font-size:12px;">${bookingId.slice(0, 8).toUpperCase()}</span></div>
        <div class="row"><span class="label">Game</span><span class="value">${gameTitle}</span></div>
        <div class="row"><span class="label">Date</span><span class="value">${date}</span></div>
        <div class="row"><span class="label">Time</span><span class="value">${startTime} – ${endTime}</span></div>
        ${amountPaid ? `<div class="row"><span class="label">Amount Paid</span><span class="value">$${Number(amountPaid / 100).toFixed(2)}</span></div>` : ""}
      </div>
      <p style="margin-top:24px; color:rgba(255,255,255,0.6); font-size:13px;">
        Please arrive 10 minutes before your slot. Bring your confirmation email or quote your Booking ID at the front desk.
      </p>
    </div>
    <div class="footer">© Skilladiz Gaming Arena · All rights reserved</div>
  </div>
</body>
</html>
  `.trim();

  await transporter.sendMail({
    from,
    to: `"${toName}" <${toEmail}>`,
    subject: `Booking Confirmed — ${gameTitle} on ${date}`,
    html,
  });
}
