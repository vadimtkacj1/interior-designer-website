/**
 * Скопіюйте цей файл у ваш Next.js проєкт, наприклад:
 *   app/api/contact/route.ts
 *
 * На сервері (.env або Docker) задайте:
 *   EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_TO
 * Для форми з GitHub Pages додайте CORS:
 *   ALLOWED_ORIGINS=https://vadimtkacj1.github.io,https://ваш-домен.il
 *
 * У репозиторії цього Vite-сайту ці змінні НЕ ставлять — лише секрет VITE_CONTACT_API_URL
 * з повним URL цього API (наприклад https://ram-haim.co.il/api/contact).
 */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function corsHeaders(request: NextRequest): Record<string, string> | null {
  const origin = request.headers.get("origin") || "";
  const allowed = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  if (!origin || allowed.length === 0 || !allowed.includes(origin)) {
    return null;
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export async function OPTIONS(request: NextRequest) {
  const h = corsHeaders(request);
  if (!h) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, { status: 204, headers: h });
}

export async function POST(request: NextRequest) {
  const h = corsHeaders(request);
  if (!h) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const {
      EMAIL_SERVER_HOST,
      EMAIL_SERVER_PORT,
      EMAIL_SERVER_USER,
      EMAIL_SERVER_PASSWORD,
      EMAIL_TO,
    } = process.env;

    if (
      !EMAIL_SERVER_HOST ||
      !EMAIL_SERVER_PORT ||
      !EMAIL_SERVER_USER ||
      !EMAIL_SERVER_PASSWORD
    ) {
      console.error("Missing email configuration env variables");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500, headers: h },
      );
    }

    if (!EMAIL_TO?.trim()) {
      console.error("Missing EMAIL_TO");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500, headers: h },
      );
    }

    const body = await request.json();
    const { name, phone, message } = body;

    if (!name?.trim() || name.trim().length < 2) {
      return NextResponse.json(
        { error: "שם חייב להכיל לפחות 2 תווים" },
        { status: 400, headers: h },
      );
    }

    const cleanPhone = phone?.replace(/[\s\-()]/g, "");
    const phoneRegex = /^(\+?972|0)?([2-9]\d{7,8})$/;

    if (!cleanPhone || cleanPhone.length < 9) {
      return NextResponse.json(
        { error: "מספר טלפון לא תקין - יש להזין לפחות 9 ספרות" },
        { status: 400, headers: h },
      );
    }

    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: "מספר טלפון לא תקין - פורמט: 05XXXXXXXX או +97205XXXXXXXX" },
        { status: 400, headers: h },
      );
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_SERVER_HOST,
      port: Number(EMAIL_SERVER_PORT),
      secure: EMAIL_SERVER_PORT === "465",
      auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: process.env.NODE_ENV === "development",
      logger: process.env.NODE_ENV === "development",
    });

    try {
      await transporter.verify();
    } catch (verifyError: unknown) {
      const err = verifyError as { message?: string; code?: string };
      console.error("SMTP verification failed:", {
        message: err.message,
        code: err.code,
        host: EMAIL_SERVER_HOST,
        port: EMAIL_SERVER_PORT,
        user: EMAIL_SERVER_USER,
      });
      return NextResponse.json(
        {
          error: "שגיאה בהגדרת שרת המייל",
          details: "אנא בדוק את הגדרות SMTP או פנה למנהל המערכת",
        },
        { status: 500, headers: h },
      );
    }

    const safeName = escapeHtml(String(name).trim());
    const safePhone = escapeHtml(String(phone).trim());
    const safeMessage = message ? escapeHtml(String(message).trim()) : "";

    const mailOptions = {
      from: `"Ram Nekasim" <${EMAIL_SERVER_USER}>`,
      to: EMAIL_TO,
      subject: `פנייה חדשה מהאתר: ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
          <div style="background-color: #1c3664; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">פנייה חדשה מהאתר</h1>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="font-size: 18px;"><strong>פרטי הלקוח:</strong></p>
            <hr />
            <p><strong>שם מלא:</strong> ${safeName}</p>
            <p><strong>טלפון:</strong> <a href="tel:${cleanPhone}">${safePhone}</a></p>
            ${
              safeMessage
                ? `<p><strong>הודעה:</strong></p><p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${safeMessage}</p>`
                : '<p><em style="color: #999;">לא צוינה הודעה</em></p>'
            }
            <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
              <small style="color: #666;">
                This is an automated message from the contact form at ram-haim.co.il
              </small>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Success" }, { status: 200, headers: h });
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string; command?: string };
    console.error("SMTP Error Details:", {
      message: err.message,
      code: err.code,
      command: err.command,
    });
    const hh = corsHeaders(request) || {};
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500, headers: hh },
    );
  }
}
