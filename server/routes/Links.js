const express = require("express");
const { nanoid } = require("nanoid");
const Link = require("../models/Links");

const router = express.Router();

// Validate URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Validate code format A–Z a–z 0–9, length 6–8
function isValidCode(code) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}

/* ============================================================
   POST /api/links → Create new short link
============================================================ */
router.post("/", async (req, res) => {
  const { url, code } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).json({ ok:false, error: "Invalid URL" });
  }

  let shortCode = code || nanoid(6); // auto generate

  if (!isValidCode(shortCode)) {
    return res.status(400).json({ success:false, error: "Invalid code format" });
  }

  // Check duplicate code
  const exists = await Link.findOne({ code: shortCode });
  if (exists) return res.status(409).json({ error: "Code already exists" });

  // Create link
  const newLink = await Link.create({ code: shortCode, url });

  return res.json({
    success:true,
    link:newLink
  });
});

/* ============================================================
   GET /api/links → List all links
============================================================ */
router.get("/", async (req, res) => {
  const links = await Link.find().sort({ createdAt: 1 });
  res.status(200).json({
    success:true,
    links:links
  });
});

/* ============================================================
   GET /api/links/:code → Fetch stats for one code
============================================================ */
router.get("/:code", async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });

  if (!link)
    return res.status(404).json({ error: "Code not found" });

  res.status(200).json({
    success:true,
    link:link
  });
});

/* ============================================================
   DELETE /api/links/:code → Delete link
============================================================ */
router.delete("/:code", async (req, res) => {
  const deleted = await Link.findOneAndDelete({ code: req.params.code });

  if (!deleted)
    return res.status(404).json({ error: "Code not found" });

  res.status(200).json({ ok: true, message: "Deleted" });
});

module.exports = router;
