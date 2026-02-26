import { getDefaultConfig } from "expo/metro-config.js";
import { resolve } from "path";

const projectRoot = import.meta.dirname;
const monorepoRoot = resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [monorepoRoot];

// Let Metro know where to resolve packages from
config.resolver.nodeModulesPaths = [
  resolve(projectRoot, "node_modules"),
  resolve(monorepoRoot, "node_modules"),
];

export default config;
