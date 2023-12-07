const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Please scan this QR code in your WhatsApp");
});

client.on("authenticated", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  if (msg.type === "image" && msg.body === ".sticker") {
    const img = await msg.downloadMedia();
    client.sendMessage(msg.from, img, { sendMediaAsSticker: true });
    console.log(
      "Successfully sent a sticker to",
      msg.from.replace(/@c\.us$/, "")
    );
  } else {
    console.log(msg.from.replace(/@c\.us$/, ""), "sent a wrong message format");
  }
});

client.initialize();
