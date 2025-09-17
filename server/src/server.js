const createApp = require("./app");
const { sequelize } = require("./shared/database");

const app = createApp();
const PORT = process.env.PORT;

async function startServer() {
  try {
    if (process.env.NODE_ENV === "production") {
      await sequelize.authenticate();
      console.log("Connected to PostgreSQL");
    }
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("Database synced (alter)");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect DB:", error);
    throw error;
  }
}

startServer();
