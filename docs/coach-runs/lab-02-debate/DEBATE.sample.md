# DEBATE — Personal Branding Site Perspectives

Input: [PROFILE.md](PROFILE.md) · Date: 2026-09-23
Scope: site structure, tone, and features for the Home / About / Interests / Contact / Guestbook site.

## Brand Strategist

- **Sell the transformation, not the résumé.** The headline already contains the offer — "turn LLM demos into dependable, production-ready agent systems." The Home hero must lead with that before/after, because that is what team leads and engineering managers are actually buying. Credentials belong in About; the outcome belongs on Home.
- **"Instructor" is the positioning, not a job title.** Practitioners who teach are common; teachers who ship are rare. The site must repeatedly evidence the practitioner side — real deployments, cost-aware architecture, guardrails that held — so workshops feel like access to lived experience, not slideware. About is where the years-building-web-platforms backstory earns that trust.
- **Adopt an anti-hype tone as the brand voice.** Short declarative sentences, concrete numbers (eval metrics, cost per task, failure modes covered), zero "revolutionary / AI-powered / game-changing" vocabulary. The SEA audience is drowning in AI hype; calm pragmatism is the differentiator.
- **Give before asking — the playbook strategy.** PROFILE.md says he already shares playbooks and templates with the Thai community. Interests should surface reusable artifacts (templates, eval checklists) rather than opinions. Public generosity is what converts a visitor into a workshop booking.
- **The Guestbook doubles as community proof.** For someone rooted in the Thai/SEA builder community, a living logbook of peers signing in is social proof a testimonial carousel can't fake. Frame it as "sign the logbook," not "leave a comment."

## UX Critic

- **Home must answer three questions in five seconds:** who is this, is it for me (engineers / analysts / PMs in SEA), and what do I do next. One hero sentence, one supporting line, one primary button pointing to Contact. The full PROFILE.md bio does **not** belong on Home — condense to two lines and link to About.
- **Contact must be one click from everywhere.** Persistent nav with Contact as the visually distinct CTA; the form stays ≤ 4 fields (name, email, organization, message), states the expected response time, and offers a mailto fallback. No accounts, no captcha gymnastics.
- **Interests is a navigation hazard without a fixed format.** Left open, it becomes a neglected pseudo-blog. Constrain it: one card per PROFILE.md interest (five total), one-line description each, optional link out. New topics replace existing cards; they never accumulate.
- **Guestbook needs abuse controls on day one or it is a liability.** Name + optional URL + message only; hard length limits; per-IP rate limiting; moderation queue or delayed publish; all links rendered `rel="nofollow noopener"`. An open, unmoderated write endpoint gets spammed within days.
- **Mobile-first and statically cheap.** Most SEA traffic is mobile on mid-range devices, and this site is ~90% static text: near-zero JavaScript, system fonts or one webfont, WCAG AA contrast, dark mode, LCP under 2.5 s. JS is justified for exactly two things — the contact form and the guestbook.

## Devil's Advocate

- **Does this need five pages at all?** If the real goal is workshop bookings, a single page — hero, proof, contact — would convert better and ship in a day. Multi-page only earns its keep if About and Interests genuinely close trust gaps. Working resolution: keep the five pages, but treat Home + Contact as the conversion pair and hold the rest to strict, minimal formats.
- **A guestbook, in 2026?** It is retro, spam-prone, and drags in a backend the rest of the site doesn't need. The only defensible justifications are (a) it's a memorable differentiator and (b) it doubles as a live demo of the small-API-with-guardrails philosophy he teaches. If both fail, cut it without sentimentality.
- **"Production-ready" claims demand receipts.** An anti-hype voice with no artifacts is just quieter hype. Before launch the site needs at least one public repo or template, one workshop artifact (agenda, slides, photos), and one concrete deployment story with numbers. No receipts, no claims.
- **Stale content is worse than no content.** Interests and a Guestbook decay fast; a site whose last guestbook entry is eight months old reads as abandoned and quietly torpedoes the "active community member" claim. Fix the update cadence up front (PROFILE.md-driven refresh each quarter) or shrink the surface that can go stale.
- **English-only quietly halves the stated audience.** The audience is Thai/SEA, but the language decision was never made. Bilingual is real ongoing cost; English-only is defensible because this audience works in English — but it must be a decision, not an accident. V1: English, with a Thai note in About as a deliberate nod.
