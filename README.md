# How to make this yours

Everything you'd want to change lives in **one file**:

```
src/data/content.ts
```

Open it and edit any words — the greeting, the timeline memories, the
bilingual lines, the letter, the reasons, the proposal text. No code
knowledge needed.

---

## Adding your photos

Drop your images into these folders (create them if they don't exist):

```
public/images/memories/   →  01.jpg, 02.jpg, 03.jpg, 04.jpg, 05.jpg, 06.jpg
public/images/gallery/    →  01.jpg, 02.jpg, 03.jpg, 04.jpg, 05.jpg, 06.jpg
public/images/hero/       →  og-cover.jpg   (the social preview image)
```

Use the same filenames listed in `src/data/content.ts` and your photos will
appear automatically. Until you add them, soft gradient placeholders are shown.

Recommended: keep images under ~1 MB and around 1000×1250 for the gallery.

---

## Adding our song

Replace this file with your music:

```
public/audio/song.mp3
```

The music never plays automatically — Tanvitha taps "Play our song" to start
it, and can pause it anytime.

## Sending response emails

The proposal choices, date details, and her personal message are sent to
`sindrimanikantaswaroop@gmail.com` through the Supabase edge function.

1. Copy `.env.example` to `.env` and fill in your Supabase project URL and anon key.
2. In Supabase, set the edge-function secret `RESEND_API_KEY`.
3. Deploy the `proposal-response` edge function and run the migrations in `supabase/migrations/`.

Without these settings, the page still works locally, but no email can be
delivered.

---

## That's it

Change the words, drop in your photos, add the song, and it's ready to send.
