import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    // Por ahora simplemente registramos el mensaje.
    // Cuando quieras conectar un servicio de email (Resend, Nodemailer, etc.)
    // puedes hacerlo aquí.
    console.log("Nuevo mensaje de contacto:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
