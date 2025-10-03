import { loadEnvConfig } from "@next/env";

// Load environment variables from .env* files
const projectDir = process.cwd();
const { combinedEnv, loadedEnvFiles } = loadEnvConfig(projectDir);

console.log(`Loaded environment variables from: ${loadedEnvFiles.map(file => file.path).join(', ')}`);

export { combinedEnv };
