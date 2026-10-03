// Logbook entries. `content` is Markdown (see src/lib/markdown.jsx for what's supported).
// Newest first. Images live in /public/blog/.
export const posts = [
  {
    slug: "building-mindspend",
    title: "Building MindSpend: an expense tracker that asks how you felt",
    excerpt:
      "Most expense trackers tell you what you spent. MindSpend tries to tell you why, and turns logging into a game so you actually keep doing it.",
    date: "2026-10-03",
    readTime: "6 min read",
    cover: "/blog/mindspend/cover.svg",
    ogImage: "/blog/mindspend/og.jpg",
    coverAlt: "MindSpend illustration: a phone showing XP, a streak and a level badge",
    tags: ["MindSpend", "FastAPI", "AI", "Gamification"],
    content: `Every expense tracker I've tried lasted about a week.

Logging felt like homework, and the charts only ever told me *what* I spent. Never *why*. And the why is the interesting part: the 2am impulse buy, the dinner I didn't want but couldn't skip, the "I deserve this" after a bad day.

So MindSpend started with one question: **what if an expense tracker cared about how you felt when you spent, and made logging feel like a game instead of a chore?**

## Money, plus mood

Every expense in MindSpend can carry two extra things besides the amount:

- an **emotion**: joyful, content, neutral, anxious, guilty, impulsive, celebratory or stressed
- an **intent**: need, want, treat, social pressure, habit, investment or emergency

That's it. Two taps. But over a few weeks, those two fields turn a list of numbers into patterns you can actually act on: *"most of my impulsive spending happens on weeknights"* is far more useful than *"you spent ₹4,200 on food"*.

## Logging in one sentence

The biggest reason people quit trackers is friction, so I wanted logging to be as fast as sending a text. You type something like:

> 320 coffee with friends, felt happy

and an LLM turns it into structured fields: amount, category, description, emotion and intent. The form pre-fills, you hit save.

![A sentence becomes structured fields: amount, category, emotion, intent](/blog/mindspend/nl-parse.svg "One sentence in, a structured expense out.")

AI calls fail, though. Keys run out, free tiers rate-limit. So there's a plain, dependency-free fallback parser: if the LLM is unavailable, it still pulls out the amount and description so you can finish manually. **The app should never get worse because the AI had a bad day.**

## Making it stick: XP, streaks, levels

This is the "game" part. Logging an expense earns XP, with a bonus when you add the emotion and intent (the data that actually makes insights possible). Consecutive days build a streak; miss a day and it resets.

Levels follow a curve, so early levels come quickly and later ones take real consistency:

\`xp_for_level(n) = 100 × (n − 1)^1.6\`, capped at level 50.

![Level curve: XP needed grows faster as levels go up](/blog/mindspend/levels.svg "Early levels come fast; later ones need real consistency.")

One rule I'm strict about: **the server owns all of it.** XP, levels and badges are computed on the backend, never accepted from the client. Otherwise anyone could edit a request and become level 50 in a second.

## A coach, not just charts

On top of the logging there's an insights layer:

- **Anomaly detection** compares your last 7 days with the ~4 weeks before, across several dimensions. It's deterministic and fast, no LLM involved, and it leans into the emotional angle, so it can spot things like a stress-spending spike, not just "you spent more".
- **Commitments audit** looks at EMIs and subscriptions. The totals are calculated exactly; an optional AI pass then suggests savings, like two music services doing the same job. If the AI isn't available, there's a static fallback.
- **An AI coach** that turns all of this into short, friendly nudges, plus proactive push notifications so the insight reaches you instead of waiting for you to open a dashboard.

## Under the hood

![Architecture: app → FastAPI → Supabase, with an LLM and push notifications](/blog/mindspend/architecture.svg "The current backend, end to end.")

- **FastAPI** for the API, versioned under \`/api/v1\`, with business logic kept in services instead of route handlers
- **Supabase** for auth and Postgres: Supabase issues JWTs, FastAPI verifies them on every request, and row-level security is on as a second wall
- **Async SQLAlchemy** for data access
- **Money stored as integers** in minor units (paise), because floating point and money don't mix
- **Push notifications** via Firebase Cloud Messaging, triggered on a schedule by a GitHub Actions cron job
- **Render** for hosting on the free tier, cold starts and all

## What I'm learning

A few things building this has taught me:

1. **Put trust on the server.** Anything that can be gamed, will be.
2. **Every AI feature needs a boring fallback.** The fallback is what makes it a product instead of a demo.
3. **Small habits beat big dashboards.** A two-tap emotion tag does more than a beautiful chart nobody opens.

MindSpend is what I'm building right now, one feature at a time. More logbook entries as it takes off.`,
  },
  {
    slug: "building-savify",
    title: "Building Savify",
    excerpt:
      "I save a lot of things online—and then forget about almost all of them. Savify is my attempt to fix that using AI.",
    date: "2025-12-21",
    readTime: "4 min read",
    cover: "/blog/savify.png",
    coverAlt: "Savify",
    tags: ["Savify", "AI", "React", "FastAPI"],
    content: `I save a lot of things online—and then forget about almost all of them.

While scrolling through LinkedIn or random websites, I often come across things I know I’ll need later: a job post, an article, an idea. I don’t have time in that moment, so I save it for later. Later rarely happens.

Like many people, I started using a WhatsApp chat with myself to dump links and notes. It worked as storage, but not as memory. Everything just sat there.

That’s where Savify started—as a simple question:
**What if the things I saved didn’t just stay saved, but came back to me when they actually mattered?**

I started working on Savify in December 2024 and dropped it by January 2025. Life happened. I paused.

Back then, I even built a simple landing page for the idea. It’s still live here:
👉 [https://savify-landing-page.vercel.app/](https://savify-landing-page.vercel.app/)

I also bought the domain **savify.app** around the same time. Earlier this year, it was time to renew it—around ₹4k for a year. I was jobless and broke, so I had to let it go. I lost the domain. That part hurt, but it’s part of the story.

Almost a year later, I’m picking this up again.

I’m learning React (still learning), and I’m building a small MVP—a Chrome extension plus a web app. The extension lets you save things instantly, and the website becomes a place where everything lives.

The AI goes through what you save, understands context, summarizes, categorizes, and occasionally reminds you—so saved things don’t quietly disappear.

## Current Plan

- **React** for frontend
- **FastAPI (Python)** for backend
- **Supabase** for the database

You’ll be able to save links, notes, PDFs, voice notes, images—anything you’d normally forget about.

I’m also looking for a new domain now—**savify.live**, **savify.life**, and a few others are available. If you have a good suggestion, I’m listening.

This is early. I’m building slowly, learning as I go, and sharing the journey as it unfolds.`,
  },
];

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
