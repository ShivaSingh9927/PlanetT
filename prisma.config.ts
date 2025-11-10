import { defineConfig } from "@prisma/config";

export default defineConfig({
  seed: {
    command: "ts-node --esm prisma/seed.ts",
  },
});
