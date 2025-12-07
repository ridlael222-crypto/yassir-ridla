// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Simpan pesan sementara di memori
let messages = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// API untuk menerima pesan
app.post("/send", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.json({ success: false, error: "Kolom tidak boleh kosong" });
  }

  messages.push({ name, message, time: new Date().toLocaleString() });
  console.log("Pesan baru:", { name, message });
  res.json({ success: true });
});

// API untuk melihat semua pesan (buat admin.html)
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
