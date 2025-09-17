require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./shared/database");
const sessionConfig = require("./shared/config/session");
const chatbotRoutes = require("./features/chatbot/chat.routes");
const paystackRoutes = require("./features/paystack/paystack.routes");

function createApp() {
  const app = express();
  
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());

  app.use(session(sessionConfig));

  // Routes
  app.use("/api/chat", chatbotRoutes);
  app.use("/api/paystack", paystackRoutes);

  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  });

  // 404 handler
  app.use("/api/*", (req, res) => {
    res.status(404).json({
      error: "Route not found",
      message: `Cannot ${req.method} ${req.originalUrl}`,
    });
  });

  if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "../../client/dist");
    const indexPath = path.resolve(__dirname, "../../client/dist/index.html");

    app.use(express.static(distPath));

    app.use("*", (req, res) => {
      res.sendFile(indexPath);
    });
  }

  return app;
}

module.exports = createApp;