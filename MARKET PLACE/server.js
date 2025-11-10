// Import library yang dibutuhkan
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

// Inisialisasi Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // default XAMPP
  password: "",      // kosong kalau belum diubah
  database: "preloved_marketplace"
});

// Cek koneksi
db.connect((err) => {
  if (err) {
    console.error("Gagal konek ke database:", err);
  } else {
    console.log("✅ Koneksi ke MySQL berhasil!");
  }
});

// Endpoint untuk login user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Error server" });
    if (results.length > 0) {
      res.json({ success: true, message: "Login berhasil!" });
    } else {
      res.json({ success: false, message: "Email atau password salah" });
    }
  });
});

// Endpoint untuk register user baru
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal registrasi" });
    res.json({ success: true, message: "Registrasi berhasil!" });
  });
});

// Jalankan server di port 3000
app.listen(3000, () => {
  console.log("🚀 Server berjalan di http://localhost:3000");
});
