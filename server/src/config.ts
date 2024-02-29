export const ApiConfig = {
  PORT: 3001,
  corsOptions: {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  },
};
