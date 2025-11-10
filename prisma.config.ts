import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",  // <-- add this line
  seed: {
    command: "ts-node --esm prisma/seed.ts",
  },
});
