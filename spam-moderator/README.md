# 🐦 Spam‑Moderator Demo

A minimal **Node (TypeScript) + Angular** proof‑of‑concept that screens tweets for spam/abuse *before* they’re posted. Clean posts are published straight to X / Twitter via the `twitter-api-v2` SDK; flagged posts are rejected with reasons.

---


## 🛠 Requirements

* **Node >= 18**
* **npm >= 9** (or pnpm / yarn)
* **Angular CLI >= 17** *(for local dev)*

---

## 🚀 Quick start (local)

```bash
# 1. Clone & enter
$ git clone https://github.com/RahulPatel4132/detect-spammy-posts
$ cd spam-moderator

# 2. Backend – install deps
$ cd api && npm install

# 3. Environment vars (Twitter creds)
$  add your Twitter creds .env         # then edit values
| Key                     | Description               |
| ----------------------- | ------------------------- |
| `TWITTER_API_KEY`       | Consumer Key (OAuth 1.0a) |
| `TWITTER_API_SECRET`    | Consumer Secret           |
| `TWITTER_ACCESS_TOKEN`  | User Access Token         |
| `TWITTER_ACCESS_SECRET` | User Access Token Secret  |


# 4. Start the API
$ npm run dev                  # http://localhost:4000

# 5. Frontend – in a new terminal
$ cd ../ui && npm install
$ ng serve --open              # http://localhost:4200
```

---

## 🔑 Environment variables (`api/.env`)

| Key                     | Description               |
| ----------------------- | ------------------------- |
| `TWITTER_API_KEY`       | Consumer Key (OAuth 1.0a) |
| `TWITTER_API_SECRET`    | Consumer Secret           |
| `TWITTER_ACCESS_TOKEN`  | User Access Token         |
| `TWITTER_ACCESS_SECRET` | User Access Token Secret  |

Generate these in the **X Developer Portal › Projects & Apps**.
Scopes required: **Read & Write**.

---


## 📄 License

MIT © 2025 Rahul Patel
