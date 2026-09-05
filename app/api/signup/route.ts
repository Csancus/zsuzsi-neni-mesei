import { NextResponse } from "next/server";

// Egyelőre nincs adatbázis: ha be van állítva a Resend, értesítőt küldünk magunknak,
// különben őszintén jelezzük a felületen, hogy a regisztráció még nem él.
const RESEND_ENDPOINT = "https://api.resend.com/emails";

type Payload = {
  email?: unknown;
  categories?: unknown;
  website?: unknown;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  }

  // mézesbödön – a botok kitöltik, az emberek nem
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!emailRe.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, reason: "bad_email" }, { status: 400 });
  }

  const categories = Array.isArray(body.categories)
    ? body.categories.filter((c): c is string => typeof c === "string").slice(0, 20)
    : [];

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SIGNUP_FROM_EMAIL;
  const to = process.env.SIGNUP_NOTIFY_TO;

  if (!apiKey || !from || !to) {
    console.warn(
      "[signup] Nincs beállítva RESEND_API_KEY / SIGNUP_FROM_EMAIL / SIGNUP_NOTIFY_TO – a jelentkezés nem lett elmentve:",
      email,
    );
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Új próbaidőszak: ${email}`,
      text: [
        `E-mail: ${email}`,
        `Kategóriák: ${categories.length ? categories.join(", ") : "(nem választott)"}`,
        `Időpont: ${new Date().toISOString()}`,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[signup] Resend hiba", res.status, detail);
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
