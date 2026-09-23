import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const NOTIFY_EMAIL = "sindrimanikantaswaroop@gmail.com";

type ProposalChoice = "yes" | "think" | "friends";

interface RequestBody {
  choice: ProposalChoice;
  date_date?: string;
  date_time?: string;
  date_location?: string;
  date_activity?: string;
  message?: string;
}

const CHOICE_LABELS: Record<ProposalChoice, string> = {
  yes: "Yes ❤️",
  think: "Let me think about it 🌸",
  friends: "I'd rather stay best friends 🤍",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br />");
}

function buildEmailHtml(body: RequestBody): string {
  const dateLine = body.date_date
    ? `<tr><td style="padding:6px 0;color:#872f42;">Date</td><td style="padding:6px 0;font-weight:600;color:#5a2230;">${escapeHtml(body.date_date)}</td></tr>`
    : "";
  const timeLine = body.date_time
    ? `<tr><td style="padding:6px 0;color:#872f42;">Time</td><td style="padding:6px 0;font-weight:600;color:#5a2230;">${escapeHtml(body.date_time)}</td></tr>`
    : "";
  const locLine = body.date_location
    ? `<tr><td style="padding:6px 0;color:#872f42;">Location</td><td style="padding:6px 0;font-weight:600;color:#5a2230;">${escapeHtml(body.date_location)}</td></tr>`
    : "";
  const actLine = body.date_activity
    ? `<tr><td style="padding:6px 0;color:#872f42;">Activity</td><td style="padding:6px 0;font-weight:600;color:#5a2230;">${escapeHtml(body.date_activity)}</td></tr>`
    : "";

  const dateSection = dateLine || timeLine || locLine || actLine
    ? `
      <h2 style="margin:28px 0 12px;font-size:18px;color:#5a2230;">Date Invitation Details</h2>
      <table style="width:100%;font-size:15px;border-collapse:collapse;">
        ${dateLine}${timeLine}${locLine}${actLine}
      </table>`
    : "";

  const messageSection = body.message && body.message.trim()
    ? `
      <h2 style="margin:28px 0 12px;font-size:18px;color:#5a2230;">Her Message to You</h2>
      <div style="background:#fff5f7;border-left:3px solid #f76a8e;border-radius:8px;padding:16px 20px;font-size:16px;line-height:1.7;color:#5a2230;font-style:italic;">
        ${escapeHtml(body.message.trim())}
      </div>`
    : "";

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#fff5f7;font-family:Georgia,serif;">
  <div style="max-width:480px;margin:24px auto;background:#fffdfb;border-radius:20px;overflow:hidden;border:1px solid #ffd1dc;">
    <div style="background:linear-gradient(135deg,#f76a8e,#e54e74);padding:24px 28px;">
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:500;">Tanvitha responded 💕</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Manish, here's what she chose.</p>
    </div>
    <div style="padding:24px 28px;">
      <h2 style="margin:0 0 12px;font-size:18px;color:#5a2230;">Her Answer</h2>
      <p style="font-size:22px;font-weight:600;color:#c43a5c;margin:0 0 8px;">
        ${CHOICE_LABELS[body.choice]}
      </p>
      ${dateSection}
      ${messageSection}
      <hr style="border:none;border-top:1px solid #ffd1dc;margin:24px 0;" />
      <p style="font-size:13px;color:#872f42;margin:0;">This is a one-time response. She cannot change it.</p>
    </div>
  </div>
</body>
</html>`;
}

function buildEmailText(body: RequestBody): string {
  const lines = [
    `Tanvitha responded to your proposal!`,
    ``,
    `Her answer: ${CHOICE_LABELS[body.choice]}`,
  ];
  if (body.date_date || body.date_time || body.date_location || body.date_activity) {
    lines.push(``, `Date Invitation Details:`);
    if (body.date_date) lines.push(`  Date: ${body.date_date}`);
    if (body.date_time) lines.push(`  Time: ${body.date_time}`);
    if (body.date_location) lines.push(`  Location: ${body.date_location}`);
    if (body.date_activity) lines.push(`  Activity: ${body.date_activity}`);
  }
  if (body.message && body.message.trim()) {
    lines.push(``, `Her message to you:`, `  ${body.message.trim()}`);
  }
  lines.push(``, `This is a one-time response. She cannot change it.`);
  return lines.join("\n");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json() as RequestBody;

    // Validate
    if (!body.choice || !["yes", "think", "friends"].includes(body.choice)) {
      return new Response(
        JSON.stringify({ error: "Invalid choice" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Sanitize message — cap length
    const message = body.message ? body.message.slice(0, 2000) : null;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Check if a response already exists (one-time lock)
    const { data: existing } = await supabase
      .from("proposal_responses")
      .select("id, choice, date_date, date_time, date_location, date_activity, message")
      .maybeSingle();

    let response = existing;

    if (!response) {
      const { data: inserted, error: insertError } = await supabase
        .from("proposal_responses")
        .insert({
          choice: body.choice,
          date_date: body.date_date ?? null,
          date_time: body.date_time ?? null,
          date_location: body.date_location ?? null,
          date_activity: body.date_activity ?? null,
          message,
        })
        .select("id, choice, date_date, date_time, date_location, date_activity, message, created_at")
        .maybeSingle();

      if (insertError) {
        if (insertError.code === "23505") {
          const { data: race } = await supabase
            .from("proposal_responses")
            .select("id, choice, date_date, date_time, date_location, date_activity, message, created_at")
            .maybeSingle();
          response = race;
        } else {
          throw insertError;
        }
      } else {
        response = inserted;
      }
    }

    if (!response) throw new Error("Could not save the proposal response");

    const updates: Record<string, string> = {};
    if (body.date_date !== undefined) updates.date_date = body.date_date;
    if (body.date_time !== undefined) updates.date_time = body.date_time;
    if (body.date_location !== undefined) updates.date_location = body.date_location;
    if (body.date_activity !== undefined) updates.date_activity = body.date_activity;
    if (body.message !== undefined) updates.message = message ?? "";

    if (Object.keys(updates).length > 0) {
      const { data: updated, error: updateError } = await supabase
        .from("proposal_responses")
        .update(updates)
        .eq("id", response.id)
        .select("id, choice, date_date, date_time, date_location, date_activity, message, created_at")
        .maybeSingle();
      if (updateError) throw updateError;
      if (updated) response = updated;
    }

    // Build the notification from the final persisted response so follow-up
    // date and message submissions include every saved field.
    const emailBody = {
      choice: response.choice as ProposalChoice,
      date_date: response.date_date ?? undefined,
      date_time: response.date_time ?? undefined,
      date_location: response.date_location ?? undefined,
      date_activity: response.date_activity ?? undefined,
      message: response.message ?? undefined,
    };

    // Send email notification via Resend
    let emailSent = false;
    let emailError: string | undefined;
    try {
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      if (RESEND_API_KEY) {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Tanvitha's Response <onboarding@resend.dev>",
            to: [NOTIFY_EMAIL],
            subject: `💕 Tanvitha answered: ${CHOICE_LABELS[response.choice as ProposalChoice]}`,
            html: buildEmailHtml(emailBody),
            text: buildEmailText(emailBody),
          }),
        });
        emailSent = emailRes.ok;
        if (!emailRes.ok) {
          emailError = `Resend returned ${emailRes.status}`;
        }
      } else {
        emailError = "RESEND_API_KEY not configured";
      }
    } catch (e) {
      emailError = e.message;
    }

    return new Response(
      JSON.stringify({
        locked: true,
        response,
        emailSent,
        emailError,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
