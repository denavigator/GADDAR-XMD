const fetch = require("node-fetch");
require("dotenv").config();

const token = process.env.WHATSAPP_TOKEN;
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
const to = process.env.TO_PHONE_NUMBER;
const message = process.env.MESSAGE || "Hello from your WhatsApp bot!";

if (!token || !phoneNumberId || !to) {
  console.error("Missing required env variables.");
  process.exit(1);
}

async function sendMessage() {
  const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: message }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (!res.ok) {
    console.log("Failed:", data);
    process.exit(1);
  }

  console.log("Message Sent:", data);
}

sendMessage();
