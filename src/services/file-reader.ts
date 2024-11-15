import fs from "node:fs";

export const readFile = (path: string): string => {
  try {
    return fs.readFileSync(path, "utf8");
  } catch (error) {
    console.error("Error reading file:", error);

    return "";
  }
};
