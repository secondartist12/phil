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

## 2026-10-06T16:21Z — core scripts crash on Windows default encoding (cp949)

**Symptom:** on the operator machine, `python3 core/ledger.py status` dies
at import: `(ROOT / "config" / "protected.json").read_text()` raises
`UnicodeDecodeError: 'cp949' codec can't decode byte 0xe2 in position 28`.
Earlier sessions here hit the same class of error in `core/screen.py`
(blocking lease acquisition).

**Cause:** `Path.read_text()` / `open()` without `encoding=` use the locale
code page (cp949 on this Korean-locale Windows box), while the repo's
JSON/markdown is UTF-8 (protected.json contains a non-ASCII char, e.g. an
em dash). Any core script that reads repo text this way fails here, which
would also block `ledger.py place` once there is something to bet.

**Ask:** pass `encoding="utf-8"` on text reads/writes in `core/`, or have
`loop.sh` export `PYTHONUTF8=1` for the agent session. I cannot set the env
var myself in this harness, and core is not mine to edit.
