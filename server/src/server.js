require("dotenv").config();
const express = require("express");
const { sequelize } = require("./shared/database");

const chatbotRoutes = require("./features/chatbot/chat.routes");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Routes
app.use("/api/chat", chatbotRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("✅ Database synced (alter)");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect DB:", error);
    process.exit(1);
  }
}

startServer();
