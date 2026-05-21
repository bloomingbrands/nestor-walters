import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid address is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const notifyEmail = process.env.ORDER_NOTIFICATION_EMAIL;

    if (!apiKey || !fromEmail || !notifyEmail) {
      return NextResponse.json(
        { error: "Server configuration incomplete." },
        { status: 500 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      subject: "New Correspondence Request",
      text: `A new reader has requested correspondence.\n\nEmail: ${email}\n\nTime: ${new Date().toISOString()}`,
      html: `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#0c0b0a;color:#d4cfc7;font-family:Georgia,serif;">
    <div style="max-width:480px;margin:40px auto;padding:32px;background:#141312;border:1px solid #2a2826;">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#8a8278;margin-bottom:24px;">Sword Circle Pen</p>
      <p style="font-size:16px;line-height:1.6;color:#d4cfc7;">A new reader has requested correspondence.</p>
      <div style="margin:24px 0;padding:16px;background:#0c0b0a;border-left:2px solid #6b5b4a;">
        <p style="font-size:13px;color:#a09890;margin:0;"><strong>Email:</strong> ${email}</p>
        <p style="font-size:13px;color:#a09890;margin:8px 0 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      </div>
      <p style="font-size:12px;color:#6b5b4a;margin-top:24px;">This is an automated notification.</p>
    </div>
  </body>
</html>
      `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Newsletter notification failed:", err);
    return NextResponse.json(
      { error: "The message could not be sent. Please try again." },
      { status: 500 }
    );
  }
}
