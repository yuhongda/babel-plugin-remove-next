export const variableDeclarationTransformSnapshot = `
import { readFileSync } from "fs";
import { round } from "mathjs";
export const makeRound = v => {
  round(1.22, 2);

  return round(v);
};`

