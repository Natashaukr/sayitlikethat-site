# SayItLikeThat site playbook

How to run the website: videos, payments, and sending visitors to the app.
(The site itself is free forever on GitHub Pages — nothing here has a hosting cost.)

---

## A. Putting your vlog videos on the site

Never upload video files to this repo — GitHub Pages is not a video host.
The pattern is: **upload once to YouTube, embed everywhere.**

- [ ] Create a dedicated YouTube channel "SayItLikeThat" (same Google login,
      2 minutes — keep it separate from Aqua Journal).
- [ ] Record in the app → export **16:9** → upload to YouTube
      (the same take exported **9:16** goes to Shorts/Reels/TikTok).
- [ ] On YouTube: Share → Embed → copy the `<iframe …>` code.
- [ ] Paste the iframe into the blog article HTML where the video belongs,
      wrapped like this so it scales on phones:

      <div style="position:relative;padding-top:56.25%">
        <iframe src="https://www.youtube.com/embed/VIDEO_ID"
          style="position:absolute;inset:0;width:100%;height:100%;border:0"
          allowfullscreen loading="lazy" title="Video title"></iframe>
      </div>

- [ ] Commit + push (or ask Claude) — live in about a minute.

## B. Taking payment through the site (checkout)

**Rule: the site never sells the app subscription** — that needs accounts the
app deliberately doesn't have. The App Store sells the app. The site sells
digital products (mini-course, extended guide, script packs).

Use a checkout that requires zero code and zero server:

- [ ] Pick one:
      - **Gumroad** (easiest: hosts the file, handles VAT/sales tax, takes ~10%)
      - **Stripe Payment Links** (cheaper ~3%, you deliver the file via email
        or a link on the thank-you page; needs slightly more setup)
      - **LemonSqueezy** (middle ground, handles tax, digital delivery built in)
- [ ] Create the product there (e.g. "American Melody Mini-Course", $19)
      and upload the deliverable (video/PDF).
- [ ] Copy the checkout link → add a Buy button to the site page:
      `<a class="button" href="https://your.gumroad.com/l/melody">Get the mini-course →</a>`
- [ ] Test-buy it yourself once end to end.
- [ ] Payouts land in your bank from the provider (set that up in their
      dashboard — same idea as Apple's banking page).

First product suggestion: turn the free checklist's big sibling into the paid
item — free "5-Minute Checklist" (email gate) → paid "Melody Mini-Course".
Same wedge funnel as Hydration on Vacation → paid guide.

## C. Referring visitors to the mobile app

- [ ] When the App Store link exists (after launch), replace the
      "App Store — coming soon" placeholder button on ALL 7 landing pages
      (marked with a comment in each index.html).
- [ ] Add Apple's Smart App Banner to every page's <head> — iPhone Safari then
      shows a native "open in App Store" strip automatically:
      `<meta name="apple-itunes-app" content="app-id=YOUR_APP_ID">`
- [ ] Blog articles: end each with the existing CTA box → App Store link.
- [ ] Instagram/TikTok bio → site → app (or straight to the App Store link).

## Already done (don't redo)

- Site live in 7 languages, sitemap + hreflang, language switcher
- Translation glosses with per-language toggle
- Privacy + support pages (the App Store URLs)
- Email capture form on checklist pages (needs your Formspree endpoint —
  see the comment above the form in checklist.html)
- The app links back here from Settings → "Free tips & articles"
