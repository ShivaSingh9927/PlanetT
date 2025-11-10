import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

// ✅ Force load environment variables from .env manually
dotenv.config();

export default defineConfig({
  seed: {
    command: "ts-node --esm prisma/seed.ts",
  },
});
