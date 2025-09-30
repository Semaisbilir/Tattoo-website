// src/app/api/quiz/route.ts
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ================= ENV (EmailJS) ================= */
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID_STUDIO = process.env.EMAILJS_TEMPLATE_ID_STUDIO || "";
const EMAILJS_TEMPLATE_ID_CLIENT = process.env.EMAILJS_TEMPLATE_ID_CLIENT || "";
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY || ""; // Access Token (server)
const EMAILJS_ORIGIN =
  process.env.EMAILJS_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@yourdomain.com";
const FROM_NAME = process.env.FROM_NAME || "Tabua Tattoo";
const STUDIO_EMAIL = process.env.ADMIN_EMAIL || "tattootabua@gmail.com";
const ALLOW_EXTERNAL =
  String(process.env.ALLOW_EXTERNAL_EMAILS || "").toLowerCase() !== "false";

/** Número mínimo de respuestas esperadas (coincide con tu quiz actual) */
const MIN_EXPECTED = 8;

/* ================= Tipos ================= */
type QA = { question: string; answer: string };
type QuizPayload = {
  qa?: QA[];
  answers?: string[];
  name: string;
  phone?: string;
  email: string;
  notes?: string;
  fileUrls?: string[];
};

/* ================= Utils ================= */
export const esc = (str?: string) =>
  (str || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const cleanQuestion = (q: string) =>
  (q || "").replace(/^\s*\d+\s*[\.)-]?\s*/i, "").trim();

// Nuevo helper
export const renderAnswer = (ans: any) => {
  if (!ans) return "—";
  if (typeof ans === "string") return esc(ans);

  // Si hay texto + archivos
  if (ans.text || ans.files) {
    const parts = [];
    if (ans.text) parts.push(esc(ans.text));
    if (ans.files && ans.files.length > 0) {
      parts.push(
        `Reference files uploaded (${ans.files.length}).` +
          "<br/>" +
          ans.files
            .map(
              (f: any, i: number) =>
                `<a href="${f.url}" target="_blank">File ${i + 1}</a>`
            )
            .join("<br/>")
      );
    }
    return parts.join("<br/>");
  }

  return esc(String(ans));
};

/* ====== Bloque de contacto del estudio (exacto) ====== */
const STUDIO_CONTACT_HTML = `
  <p style="margin:0;line-height:1.6;">
    Tattooing at Monkey King Tattoo<br/>
    774 Kingsway, Vancouver<br/>
    <a href="mailto:tabuatattoo@gmail.com">tabuatattoo@gmail.com</a><br/>
    778 839 8129
  </p>
`;
const STUDIO_CONTACT_TEXT = `Tattooing at Monkey King Tattoo
774 Kingsway, Vancouver
tabuatattoo@gmail.com
778 839 8129`;

/* ================= Validación ================= */
function validate(p: QuizPayload) {
  const errs: string[] = [];
  if (!EMAILJS_SERVICE_ID) errs.push("Missing EMAILJS_SERVICE_ID.");
  if (!EMAILJS_TEMPLATE_ID_STUDIO) errs.push("Missing EMAILJS_TEMPLATE_ID_STUDIO.");
  if (ALLOW_EXTERNAL && !EMAILJS_TEMPLATE_ID_CLIENT)
    errs.push("Missing EMAILJS_TEMPLATE_ID_CLIENT.");

  // 🔴 La API está pidiendo explícitamente la public key
  if (!process.env.EMAILJS_PUBLIC_KEY) errs.push("Missing EMAILJS_PUBLIC_KEY (Public Key).");

  if (!p.name) errs.push("Missing name.");
  if (!p.email) errs.push("Missing email.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) errs.push("Invalid email format.");
  const count = p.qa?.length ?? p.answers?.length ?? 0;
  if (count < MIN_EXPECTED) errs.push(`Expected at least ${MIN_EXPECTED} answers.`);
  return errs;
}

/* ================= Render ================= */
function answersHTML(p: QuizPayload) {
  const answerToHtml = (s?: string) =>
    esc(s || "No").replace(/\n/g, "<br/>"); // preserva saltos de línea en respuestas/notas

  const items =
    p.qa && p.qa.length
      ? p.qa.map(
          (it) => `
        <li style="margin:0 0 12px;">
          <div><strong>${esc(cleanQuestion(it.question))}</strong></div>
          <div style="margin-top:4px;">${answerToHtml(it.answer)}</div>
        </li>`
        )
      : (p.answers || []).map(
          (a, i) => `
        <li style="margin:0 0 12px;">
          <div><strong>Q${i + 1}</strong></div>
          <div style="margin-top:4px;">${answerToHtml(a)}</div>
        </li>`
        );

  return `<ol style="padding-left:22px;margin:0;">${items.join("")}</ol>`;
}


function filesHTML(urls?: string[]) {
  if (!urls?.length) return "";
  return `
    <h3 style="font-size:18px;margin:24px 0 8px;">Uploaded Files</h3>
    <ul style="padding-left:20px;margin:0;">
      ${urls
        .map(
          (u, i) => `
        <li style="margin:8px 0;">
          <a href="${u}" target="_blank" rel="noreferrer">File ${i + 1}</a><br/>
          <img src="${u}" alt="ref ${i + 1}" style="max-width:320px;height:auto;border-radius:8px;margin-top:6px;" />
        </li>`
        )
        .join("")}
    </ul>
  `;
}

function studioHTML(p: QuizPayload) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#111;">
    <h2 style="font-size:22px;margin:0 0 16px;">New Tattoo Quiz Submission</h2>

    <h3 style="font-size:20px;margin:20px 0 8px;">Answers</h3>
    ${answersHTML(p)}

    ${filesHTML(p.fileUrls)}

    <h3 style="font-size:20px;margin:24px 0 8px;">Contact</h3>
    <p style="margin:0;line-height:1.7;">
      <strong>Name:</strong> ${esc(p.name)}<br/>
      <strong>Phone:</strong> ${esc(p.phone || "")}<br/>
      <strong>Email:</strong> <a href="mailto:${esc(p.email)}">${esc(p.email)}</a><br/>
      <strong>Notes:</strong> ${esc(p.notes || "")}
    </p>
  </div>`;
}

function studioText(p: QuizPayload) {
  const qaText = p.qa
    ? p.qa.map((it, i) => `${i + 1}. ${it.question}\n${it.answer || "No"}`).join("\n\n")
    : (p.answers || []).map((a, i) => `${i + 1}. Q${i + 1}\n${a || "No"}`).join("\n\n");

  const files =
    p.fileUrls?.length
      ? `\nUploaded Files:\n${p.fileUrls.map((u, i) => `- File ${i + 1}: ${u}`).join("\n")}\n`
      : "";

  return [
    "New Tattoo Quiz Submission",
    "",
    "Answers",
    qaText,
    files,
    "Contact",
    `Name: ${p.name}`,
    `Phone: ${p.phone || ""}`,
    `Email: ${p.email}`,
    `Notes: ${p.notes || ""}`,
  ].join("\n");
}

function clientHTML() {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.6;">
    <h2 style="font-size:18px;margin:0 0 12px;">Thanks for your submission</h2>
    <p style="margin:0 0 12px;">We received your tattoo quiz. We will contact you soon.</p>
    <h3 style="font-size:16px;margin:16px 0 8px;">Studio Contact</h3>
    ${STUDIO_CONTACT_HTML}
    <p style="margin:16px 0 0;font-size:12px;color:#555;">
      If you need to update any details, please reply to this email.
    </p>
  </div>`;
}

function clientText() {
  return [
    "Thanks for your submission.",
    "We received your tattoo quiz. We will contact you soon.",
    "",
    "Studio Contact",
    STUDIO_CONTACT_TEXT,
    "",
    "If you need to update any details, please reply to this email.",
  ].join("\n");
}

/* ================= EmailJS Sender (server) ================= */
async function sendViaEmailJS({
  toEmail,
  toName,
  subject,
  html,
  text,
  templateId,
  replyTo,
}: {
  toEmail: string;
  toName?: string;
  subject: string;
  html: string;
  text: string;
  templateId: string;
  replyTo?: string;
}) {
  const body = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: templateId,

    // ✅ Incluimos SIEMPRE la public key (user_id)
    user_id: process.env.EMAILJS_PUBLIC_KEY,

    // ✅ Si tienes Access Token (private key) también lo mandamos
    accessToken: EMAILJS_PRIVATE_KEY || undefined,

    template_params: {
      subject,
      html_body: html,
      text_body: text,
      to_email: toEmail,
      to_name: toName || "",
      from_email: FROM_EMAIL,
      from_name: FROM_NAME,

      // La plantilla del estudio usa {{email}} en Reply-To
      email: replyTo || "",
    },
  };

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: EMAILJS_ORIGIN, // p.ej. http://localhost:3000
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(errText || `EmailJS error ${res.status}`);
  }
}

/* ================= Handler ================= */
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Preferimos 'qa' (pregunta + respuesta)
    let qa: QA[] | undefined;
    const qaRaw = form.get("qa");
    if (typeof qaRaw === "string") {
      try {
        const parsed = JSON.parse(qaRaw);
        if (Array.isArray(parsed)) {
          qa = parsed
            .map((it) => ({
              question: String(it?.question ?? ""),
              answer: String(it?.answer ?? ""),
            }))
            .filter((it) => it.question);
        }
      } catch {}
    }

    // Fallback: 'answers' (solo respuestas)
    let answers: string[] | undefined;
    if (!qa) {
      const ansRaw = form.get("answers");
      if (typeof ansRaw === "string") {
        try {
          const parsed = JSON.parse(ansRaw);
          if (Array.isArray(parsed)) answers = parsed.map((v) => String(v ?? ""));
        } catch {}
      }
      if (!answers?.length) {
        const multi = form.getAll("answers[]");
        if (multi.length) answers = multi.map((v) => (typeof v === "string" ? v : ""));
      }
    }

    // URLs pre-subidas (fileUrls o fileUrls[])
    let fileUrls: string[] = [];
    const fileUrlsRaw = form.get("fileUrls");
    if (typeof fileUrlsRaw === "string") {
      try {
        const parsed = JSON.parse(fileUrlsRaw);
        if (Array.isArray(parsed)) {
          fileUrls = parsed.filter((u) => typeof u === "string" && /^https?:\/\//i.test(u));
        }
      } catch {
        if (/^https?:\/\//i.test(fileUrlsRaw)) fileUrls = [fileUrlsRaw];
      }
    }
    if (!fileUrls.length) {
      const multi = form.getAll("fileUrls[]");
      if (multi.length)
        fileUrls = multi.map((v) => (typeof v === "string" ? v : "")).filter(Boolean);
    }

    // Archivos crudos -> subir a Cloudinary
    const filesFromArray = form.getAll("files[]").filter((v) => v instanceof File) as File[];
    const discovered: File[] = [];
    for (const [k, v] of (form as any).entries()) {
      if (v instanceof File && k !== "files[]") discovered.push(v);
    }
    const allFiles = [...filesFromArray, ...discovered];
    if (allFiles.length) {
      const uploads = await Promise.all(
        allFiles.map(async (file, i) => {
          const ab = await file.arrayBuffer();
          const buf = Buffer.from(ab);
          const base = (file.name || `upload-${Date.now()}-${i}`).replace(/\.[^.]+$/, "");
          const res = await uploadToCloudinary(buf, base);
          const url = (res as any)?.secure_url || (res as any)?.url;
          return url as string;
        })
      );
      fileUrls.push(...uploads.filter(Boolean));
    }

    const name = (form.get("name") || "").toString().trim();
    const phone = (form.get("phone") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const notes = (form.get("notes") || "").toString();

    const payload: QuizPayload = { qa, answers, name, phone, email, notes, fileUrls };

    const errors = validate(payload);
    if (errors.length) {
      return NextResponse.json(
        { ok: false, error: "ValidationError", details: errors },
        { status: 400 }
      );
    }

    // Cuerpos
    const subjStudio = `New Tattoo Quiz Submission — ${name}`;
    const htmlStudio = studioHTML(payload);
    const textStudio = studioText(payload);

    const subjClient = "We received your tattoo quiz";
    const htmlClient = clientHTML();
    const textClient = clientText();

   // Envío al ESTUDIO
await sendViaEmailJS({
  toEmail: STUDIO_EMAIL,
  toName: "Studio",
  subject: subjStudio,
  html: htmlStudio,
  text: textStudio,
  templateId: EMAILJS_TEMPLATE_ID_STUDIO,
  replyTo: email,            // Reply-To = correo del cliente
});

// Enviar CONFIRMACIÓN al CLIENTE (si procede)
if (ALLOW_EXTERNAL) {
  try {
    await sendViaEmailJS({
      toEmail: email,         // destinatario = cliente (en la plantilla usa {{to_email}})
      toName: name,
      subject: subjClient,
      html: htmlClient,
      text: textClient,
      templateId: EMAILJS_TEMPLATE_ID_CLIENT,
      replyTo: STUDIO_EMAIL,  // opcional: que “Responder” vaya al estudio
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: true, warning: "ClientEmailError", details: e?.message || String(e) },
      { status: 207 }
    );
  }
} else {
  return NextResponse.json(
    { ok: true, skippedClientEmail: true, reason: "ALLOW_EXTERNAL_EMAILS=false" },
    { status: 207 }
  );
}

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: "ServerError", message: err?.message || "Unexpected error." },
      { status: 500 }
    );
  }
}
