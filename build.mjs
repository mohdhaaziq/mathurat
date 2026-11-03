// Bina index.html dari index.template.html: masukkan teks Arab "Doa Pujian"
// terus dari data app (elak teks Arab rosak bila disunting tangan).
// Guna: node build.mjs ../Mathurat-PWA/client/src/data/mathurat.ts index.template.html index.html
import { readFileSync, writeFileSync } from "node:fs";
const [, , dataPath, tplPath, outPath] = process.argv;
const src = readFileSync(dataPath, "utf8");
// ambil array Kubra secara kasar: setiap objek { id: "...", ... }
const kubraSrc = src.slice(src.indexOf("mathuratKubra"), src.indexOf("];", src.indexOf("mathuratKubra")));
const ids = [...kubraSrc.matchAll(/id: "([^"]+)"/g)].map(m => m[1]);
const sughra = [...kubraSrc.matchAll(/id: "([^"]+)"[\s\S]*?repeat: \d+(,\s*sughraRepeat: \d+)?/g)].filter(m => m[2]).map(m => m[1]);
const block = kubraSrc.slice(kubraSrc.indexOf('id: "doa-pujian"'));
const field = (k) => JSON.parse(block.match(new RegExp(`\\n\\s*${k}: ("(?:[^"\\\\]|\\\\.)*")`))[1]);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
let html = readFileSync(tplPath, "utf8")
  .replace("__AR_PAGI__", esc(field("arabic")))
  .replace("__AR_PETANG__", esc(field("arabic_evening")))
  .replace("__TR_PAGI__", esc(field("translation")))
  .replace("__TR_PETANG__", esc(field("translation_evening")))
  .replace("__STEP__", String(ids.indexOf("doa-pujian") + 1));
writeFileSync(outPath, html);
console.log("kubra", ids.length, "pos", ids.indexOf("doa-pujian") + 1, "sughra", sughra.length, sughra.join(","));
