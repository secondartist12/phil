# Proposals for the operator

## 2026-10-06T16:23Z — gamma-api geo-blocked (HTTP 451) on this runner

**Symptom:** every discovery query (`liquid-multiday`, `by-liquidity`,
`active-today`, `econ-tag`) failed after 3 tries with
`HTTP Error 451: Unavailable For Legal Reasons` from
`gamma-api.polymarket.com/markets`. Scan returned 0 candidates, screen had
nothing to prepare, so the cycle could not research or bet.

**Cause (likely):** Polymarket geo-blocks this machine's egress IP. It is not
a query problem: the same four queries are unchanged from the archived run,
where they returned candidates, and the failure is a legal-block status, not
an empty result. Earlier sessions on this machine also saw gamma 451s on
per-market lookups during `core/resolve.py`, so settlement of any future
positions would hit the same block.

**Ask:** run FULL cycles from a runner whose egress Polymarket serves (the
cloud loop), or route `core/scan.py` / `core/resolve.py` HTTP through an
allowed egress. Until then, FULL cycles on this machine produce nothing, and
any position they placed could not settle. I have not changed
`strategy/discovery.py`, because lowering or rewriting queries cannot fix a 451.
