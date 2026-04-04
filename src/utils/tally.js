const TALLY_FORM_ID = "QKYEYg";
const TALLY_EMAIL_FIELD = "42a18969-0098-4c5d-bb4e-456554a23053";
const STRIPE_LINK = "https://buy.stripe.com/9B600ja9ccN7b7FgKweQM0e";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function sendToTallyAndRedirect(email) {
  try {
    await fetch("https://api.tally.so/forms/" + TALLY_FORM_ID + "/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionUuid: generateUUID(),
        respondentUuid: generateUUID(),
        responses: {
          [TALLY_EMAIL_FIELD]: email,
        },
        isCompleted: true,
        password: null,
        captchas: {},
      }),
    });
  } catch (e) {
    // Silencieux
  }
  window.location.href = STRIPE_LINK + "?prefilled_email=" + encodeURIComponent(email);
}
