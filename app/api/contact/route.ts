import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "daniespimau@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nuevo mensaje de ${name} — Portfolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #0c0c0e; color: #e8e8ed; border-radius: 12px;">
          <h2 style="color: #6366f1; margin-bottom: 24px; font-size: 1.25rem;">Nuevo mensaje desde el portfolio</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #8e8e99; font-size: 0.875rem; width: 80px;">Nombre</td>
              <td style="padding: 10px 0; color: #e8e8ed;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8e8e99; font-size: 0.875rem;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #2a2a2e; margin: 20px 0;" />
          <p style="color: #8e8e99; font-size: 0.875rem; margin-bottom: 8px;">Mensaje</p>
          <p style="color: #e8e8ed; line-height: 1.7; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
