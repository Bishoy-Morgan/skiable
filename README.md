# ❄✈️ Skiable

**Skiable** is a modern, high-performance web app that helps users search and explore airports based on cities, states, or locations — perfect for travelers and aviation enthusiasts.

## 🌍 Live Site

👉 [https://skiable.vercel.app](https://skiable.vercel.app)

---

## 🚀 Features

- 🔍 **Search Airports** by city, state, or place name.
- 🌐 **Fast API** built with TypeScript and Next.js App Router.
- 📦 Uses **MongoDB** for storing and retrieving airport data.
- ⚙️ Server-side API routes with `/api/v1/flights/searchAirport`.
- 💅 Styled using **Tailwind CSS** for a clean, responsive UI.
- 📁 Organized project structure using `lib/`, `app/`, and `api/`.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: API Routes with Next.js (App Router)
- **Database**: MongoDB
- **Deployment**: Vercel

---

## 📂 Project Structure

/app
/api/v1/flights/searchAirport - API endpoint
/components - UI components
/hooks - custom hooks
/lib/mongodb.ts - MongoDB connection
/page.tsx - main page


---

## 🧪 Getting Started (Local Development)

1. Clone the repo:

```bash
git clone https://github.com/your-username/skiable.git
cd skiable

2. Install dependencies:

npm install

3. Create a .env.local file in the root directory and add your MongoDB connection string:

MONGODB_URI=your-mongodb-uri-here

4.Run the development server:

npm run dev

5. Open http://localhost:3000 in your browser.

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

📄 License
MIT License
© 2025 Bishoy Morgan

