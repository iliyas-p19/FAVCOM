FAVCOM – AI-Powered eCommerce Platform

Features:

✅ 40,000+ Products from Flipkart dataset (CSV integrated)
✅ Dynamic Categories auto-generated from dataset
✅ AI-Powered Search with autocomplete & semantic understanding
✅ Smart Recommendations (highly-rated & wishlist-based)
✅ Responsive UI/UX (works on Desktop, Tablet, Mobile seamlessly)
✅ Wishlist + Cart with delete/move options
✅ Profile Management (edit details, upload profile picture, save order history)
✅ Customer Service Pages (Privacy, Terms, Shipping, Returns)
✅ AI Chatbot (OpenAI) answers contextually with real product data
✅ Dark Theme with clean, visible text across all pages
✅ Filters for sorting products by rating, price (Low→High, High→Low)
✅ Fast & Scalable optimized for large dataset handling

🛠️ Tech Stack

Frontend:

React.js (Next.js optional for SSR)

TailwindCSS (UI/UX styling)

Redux / Context API (state management)

Backend:

Node.js + Express.js

MongoDB / PostgreSQL (user data, wishlist, profile, orders)

REST APIs for product search, categories, filters

AI / ML:

OpenAI API (Chatbot & semantic search)

NLP for search optimization & autocomplete

Recommendation System:

Collaborative Filtering (wishlist, user behavior)

Content-Based Filtering (product attributes)

Hybrid Model

Production Optimizations: Code splitting, lazy loading, caching, pagination

Dataset:

flipkart.csv (40,000+ products) from Kaggle

Auto-category generation based on product names & attributes

⚡ Machine Learning & AI Operations

🔍 AI Search Optimization

📦 Recommendation System

Based on reviews, wishlist, and user history

💬 AI Chatbot (OpenAI API)

Context-aware responses

Example:

User: “Best shirts under 1000”

Bot: “Here are the top-rated shirts under 1000 from our catalog”

⚙️ How It Works

Dataset Integration → flipkart.csv imported inside src/data/

Dynamic Categories → auto-created based on product attributes

AI Search → powered by OpenAI + NLP

Wishlist & Profile → stored in database, synced in real-time

Chatbot → powered by OpenAI API key in .env.local

CI/CD → GitHub Actions builds & deploys automatically

Deployment → Dockerized for production-ready environment

🐳 Docker Setup

# Build the Docker image

docker build -t favcom .

# Run the container

docker run -p 3000:3000 favcom

🔄 GitHub Actions CI/CD

On every push → Build app → Run tests → Deploy automatically

Ensures production mode build with optimized performance

📱 Responsiveness

Mobile First Design

Automatically adjusts UI/UX for Desktop, Tablet, and Mobile

📌 Future Improvements

Voice-enabled shopping assistant

Multi-language product search (NLP)

AI-powered fraud detection

Real-time order tracking with GPS integration

🚀 Quick Start

Prerequisites:

->Node.js 18+

->Git

->OpenAI API key (optional, for AI features)

Installation
1.Clone the repository

git clone <your-github-repo-url>

cd FAVCOM

2.Run automated setup

npm run setup

This installs dependencies, processes data, and builds the application

3.Start development server

npm run dev

4.Access the application

Local: http://localhost:3000 (click and run)

Network: http://[your-ip]:3000

'''# Available Scripts: #'''

# Development

npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server

# Data Processing

npm run process:data # Process product dataset
npm run setup # Complete setup

# Docker

npm run docker:build # Build Docker image
npm run docker:run # Run Docker container

🔄 Maintenance
To update the application:

git pull origin main
npm install
npm run build
npm run dev

🤝 Contributing
1.Fork the repository

2.Create a feature branch

3.Make your changes

4.Submit a pull request
