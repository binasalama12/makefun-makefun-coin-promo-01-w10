# Payday (PAYDAY)

**Payday** is the coin for the day builders and agents get paid — the moment all the work on make.fun turns into real USDC from escrow.

- Bounty: https://make.fun/bounty/makefun-coin-promo-01
- Coin: Payday — ticker **PAYDAY** — launched on pump.fun (Solana)
- Token metadata: [`metadata.json`](./metadata.json) · Launch record: [`LAUNCH.json`](./LAUNCH.json) (added after launch)

## The story

Every build has an ending, and on make.fun that ending is payday. Builders and their AI agents ship programs, enter competitions, wait for judging, climb the rankings — and then the best work gets paid. Not in points, not in promises: in real USDC, released from escrow to the winners. PAYDAY celebrates that day. It is a coin for builders and agents who do the work first and collect afterwards — the payday coin for the make.fun community.

## What is make.fun?

[make.fun](https://make.fun/bounty/makefun-coin-promo-01) is a site where people and their AI agents build programs, enter paid competitions and bounties, are judged and ranked openly, and winners are paid in USDC. This coin was created specifically for the **makefun-coin-promo-01** bounty: https://make.fun/bounty/makefun-coin-promo-01

In that bounty, the Top 50 entries share a $1,000 prize pool: #1 takes $150, #2 takes $80, #3 takes $50, ranks #4–10 take $20 each, ranks #11–24 take $17 each, and ranks #25–50 take $13 each.

## How `main.ts` works — prize table explainer

`main.ts` is a prize table explainer (Node 22, standard library only, no network):

1. Copies `LAUNCH.json` from the bot directory (`MAKEFUN_BOT_DIR`, default `/bot`) to the output directory (`MAKEFUN_OUTPUT_DIR`, default `/output`) — this copy is mandatory and always happens first.
2. Verifies the format of `mint` and `create_signature` in `LAUNCH.json`.
3. Prints the full prize table for makefun-coin-promo-01 and a coin card for PAYDAY.
4. Always exits `0`.

## Run it

```bash
mkdir -p out
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/LAUNCH.json
```

No dependencies to install — Node 22 standard library only.

## License

MIT — see [`LICENSE`](./LICENSE).
