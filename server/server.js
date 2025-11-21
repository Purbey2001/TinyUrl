const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const Link = require("./models/Links");
const linkRoutes = require("./routes/Links");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

/* ============================================================
   HEALTH CHECK → GET /healthz
============================================================ */
app.get("/healthz", (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});

/* ============================================================
   API ROUTES
============================================================ */
app.use("/api/links", linkRoutes);

/* ============================================================
   REDIRECT ROUTE → GET /:code
============================================================ */
app.get("/:code", async (req, res) => {
  const { code } = req.params;

  const link = await Link.findOne({ code });

  if (!link) return res.status(404).send("Not found");

  // Increment click counter
  link.clicks += 1;
  link.lastClicked = new Date();
  await link.save();

  return res.redirect(302, link.url);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
