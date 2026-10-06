# Operator notes

## 2026-10-07 — experiment restarted

The previous journal (ledger, forecasts, retros, screener logs, quotas) was
archived to `archive/journal-20261007/`. This is a fresh run: the simulated
bankroll starts again at $1,000 (`config/protected.json` →
`sim_bankroll_usd`), with no open positions. Treat ledger/forecast references
in `strategy/` as history from the archived run, not as live state.
