// Payday (PAYDAY) — prize table explainer for make.fun coin promo.
// Copies LAUNCH.json to the output dir, validates its shape, then prints
// the prize table for makefun-coin-promo-01 and a coin card for PAYDAY.
// Pure Node.js standard library, no network access, always exits 0.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR || "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;

const PRIZES = [
  { rank: "#1", places: 1, each: 150 },
  { rank: "#2", places: 1, each: 80 },
  { rank: "#3", places: 1, each: 50 },
  { rank: "#4-10", places: 7, each: 20 },
  { rank: "#11-24", places: 14, each: 17 },
  { rank: "#25-50", places: 26, each: 13 },
];

function isPlausibleMint(v) {
  return typeof v === "string" && v.length >= 32 && v.length <= 44 && BASE58.test(v);
}
function isPlausibleSignature(v) {
  return typeof v === "string" && v.length >= 80 && v.length <= 90 && BASE58.test(v);
}

function printPrizeTable() {
  console.log("");
  console.log("=== makefun-coin-promo-01 — Prize Table ===");
  console.log("Top 50 entries share a $1,000 prize pool:");
  console.log("");
  console.log("  Rank      Places   Prize each   Subtotal");
  console.log("  --------  ------   ----------   --------");
  for (const row of PRIZES) {
    const subtotal = row.places * row.each;
    console.log(
      "  " +
        row.rank.padEnd(8) +
        "  " +
        String(row.places).padEnd(6) +
        "   " +
        ("$" + row.each).padEnd(10) +
        "   $" +
        subtotal
    );
  }
  console.log("  --------  ------   ----------   --------");
  console.log("  Pool: Top 50 share $1,000, as published for this bounty.");
  console.log("  Bounty: https://make.fun/bounty/makefun-coin-promo-01");
}

function printCoinCard(launch) {
  console.log("");
  console.log("=== Payday (PAYDAY) — Coin Card ===");
  console.log("Name:   Payday");
  console.log("Ticker: PAYDAY");
  console.log("Story:  Every build on make.fun ends in payday — the best");
  console.log("        work gets paid real USDC from escrow. PAYDAY is");
  console.log("        the coin for the payday of builders and agents.");
  if (launch) {
    console.log("Mint:            " + launch.mint);
    console.log("Create signature: " + launch.create_signature);
  } else {
    console.log("Mint:            (see LAUNCH.json after launch)");
  }
  console.log("Website: https://make.fun/bounty/makefun-coin-promo-01");
  console.log("====================================");
}

function main() {
  const src = join(botDir, "LAUNCH.json");
  if (!existsSync(src)) {
    console.log("LAUNCH.json not found at " + src + " — nothing to copy yet.");
    printPrizeTable();
    printCoinCard(null);
    return;
  }
  mkdirSync(outDir, { recursive: true });
  const dst = join(outDir, "LAUNCH.json");
  copyFileSync(src, dst);
  console.log("Copied LAUNCH.json -> " + dst);

  let launch;
  try {
    launch = JSON.parse(readFileSync(src, "utf8"));
  } catch (err) {
    console.log("LAUNCH.json is not valid JSON: " + String(err));
    printPrizeTable();
    printCoinCard(null);
    return;
  }

  const mintOk = isPlausibleMint(launch.mint);
  const sigOk = isPlausibleSignature(launch.create_signature);
  console.log(
    "Format check — mint: " + (mintOk ? "OK" : "INVALID") +
      ", create_signature: " + (sigOk ? "OK" : "INVALID")
  );
  if (!mintOk || !sigOk) {
    console.log("LAUNCH.json fields failed format verification.");
  }

  printPrizeTable();
  printCoinCard(launch);
}

try {
  main();
} catch (err) {
  console.log("Non-fatal error: " + String(err));
}
process.exitCode = 0;
