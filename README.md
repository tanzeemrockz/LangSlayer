# LangSlayer ⚡

> **Slaying hyper-technical jargon into simple, digestible terms.**  
> A fast, lightweight PWA designed to convert dense academic research and complex textbook excerpts into concise summaries and real-world analogies for non-native English speakers.

---

## Inspiration
I looked at my friends **struggling** to understand concepts using textbooks. They needed somebody who could **teach** them concepts. Even to understand *simple concepts* like atomic structure, they *needed* someone to explain it because their English wasn't sufficient. 

In a country as large and diverse as India, English is a second language that most students just have to mug up. Realizing that most academic text lives strictly in English completely changed my mindset. So, I looked around the internet for tools or apps that solve this problem or *at least* something like it—and turns out, **none existed**. So, LangSlayer was built.

---

## What it does
**LangSlayer** takes complex textbook excerpts and breaks down the jargon into simple, everyday English. Instead of performing literal word-for-word translation (which ruins scientific context), it outputs:
1. **A 2-Sentence Summary:** Filters out administrative vocabulary to present the exact core mechanism in two readable sentences.
2. **Real-World Analogies:** Pairs theoretical concepts (like electron shells or wave functions) with relatable everyday mental models.
3. **Instant Inference:** Leverages high-speed open-source models so students get immediate responses without wait times.

---

## Aesthetic & Design Language
Inspired by the **Suvidha Hackathon** paper aesthetic:
* **Typography:** Pure sans-serif typography utilizing **Plus Jakarta Sans** for modern headers and body text (no serif fonts or heavy terminal monospace fonts).
* **Color Palette:** Warm off-white background canvas (`#F7F6F0`) with a subtle grid-dot pattern, clean slate-blue structural lines (`#E2E8F0`), and dark navy elements (`#101E36`).
* **UI Elements:** Editorial card layouts, minimalist button borders, diamond separators (`◇ ◆ ◇`), and lightweight sample chips for instant testing.

---

## How we built it
* **Frontend Shell:** Built using Vite, vanilla JavaScript, and HTML5, styled with Tailwind CSS for a clean, grid-paper editorial reading experience.
* **PWA Engine:** Configured with Web App Manifests and service worker logic so the app can be installed natively on mobile or desktop devices.
* **AI Model Integration:** Connected directly to open-source models (`openai/gpt-oss-20b`) via the Groq API for sub-second inference speeds using a "Bring Your Own Key" (BYOK) model.
* **Dynamic Rendering:** Integrated `marked.js` to parse raw AI completion payloads into formatted, scannable HTML.

---

## Challenges we ran into
* **Aesthetic Alignment:** Moving away from a generic dark/cyberpunk look to construct a clean, warm editorial paper interface while maintaining crisp UI contrast.
* **Model Lifecycle Management:** Finding an active, stable open-source model endpoint on free-tier routes required testing multiple model strings and adapting to API deprecations.
* **Markdown Formatting:** Ensuring raw text completions from the API rendered properly as rich HTML without introducing heavy framework dependencies or breaking layout responsiveness.

---

## Accomplishments that we're proud of
* **Zero-Latency Feel:** Achieving rapid response times using Groq's high-speed inference engine, making jargon simplification feel almost instantaneous.
* **Value-First UI:** Designing a dual-page system (`/` for story/landing, `/go` for workspace) that strips away unnecessary clutter so students can focus purely on learning.
* **Context Preservation:** Crafting a system prompt that generates effective, accurate real-world analogies instead of flat, robotic translations.

---

## What we learned
* How to design cohesive, multi-route layouts with lightweight CSS grid styling and Tailwind utilities.
* How to construct and register PWA manifests and service workers for cross-platform web installation.
* How to manage local storage states for secure client-side API key handling without backend overhead.

---

## What's next for LangSlayer
* **Interactive Glossary:** Clickable technical words that pull up mini-popups with instant, one-line definitions.
* **Multi-Language Side-by-Side:** Displaying simplified English alongside optional regional language translations.
* **Saved History:** Storing recently slayed excerpts in browser memory for quick offline review.
