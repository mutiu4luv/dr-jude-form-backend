import cors from "cors";

const rawAllowedOrigins = [
  process.env.FRONTEND_URL_MAIN,
  "https://www.upspaceconsulting.com",
  process.env.MAIN_APP_URL,
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);
console.log(rawAllowedOrigins);

// Normalize (remove trailing slashes)
const allowedOrigins = rawAllowedOrigins.map((o) => o.replace(/\/$/, ""));

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman/curl
    const normalizedOrigin = origin.replace(/\/$/, "");
    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      console.warn("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

export default cors(corsOptions);
