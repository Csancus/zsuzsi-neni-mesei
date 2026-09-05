import { NextResponse } from "next/server";

import { web3formsKey } from "@/lib/forms";

// Web3Forms – ugyanaz az ingyenes megoldás, ami a lelkekgyogyasza.hu és a
// budapest-dietetikus.hu oldalakon is fut. (A FormSubmit 2026-07-15-én leállt.)
// Itt szerver oldalról hívjuk, így a hozzáférési kulcs nem kerül bele a kliens bundle-be.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

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

  const accessKey = web3formsKey();
  if (!accessKey) {
    console.warn(
      "[signup] Nincs Web3Forms kulcs (lib/forms.ts vagy WEB3FORMS_ACCESS_KEY) – a jelentkezés nem lett elküldve:",
      email,
    );
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  let res: Response;
  try {
    res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Új feliratkozó: ${email}`,
        from_name: "Zsuzsi néni meséi",
        replyto: email,
        "E-mail": email,
        Kategóriák: categories.length ? categories.join(", ") : "(nem választott)",
        Időpont: new Date().toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }),
      }),
    });
  } catch (err) {
    console.error("[signup] Web3Forms nem elérhető", err);
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }

  const result = (await res.json().catch(() => null)) as { success?: boolean } | null;
  if (!res.ok || result?.success !== true) {
    console.error("[signup] Web3Forms hiba", res.status, result);
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
