FAVCOM – AI-Powered eCommerce Platform

### Installation

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

### 🛠️ Tech Stack ###

### Frontend 

- **Next.js 15.5.3** - React framework with App Router
- 
- **React 19.1.0** - UI library
- 
- **TypeScript 5** - Type-safe JavaScript
- 
- **Tailwind CSS 4** - Utility-first CSS framework

### Backend:

Node.js + Express.js

MongoDB / PostgreSQL (user data, wishlist, profile, orders)

REST APIs for product search, categories, filters

### AI / ML:⚡ Machine Learning & AI Operations

OpenAI API (Chatbot & semantic search) , 💬 AI Chatbot (OpenAI API)

Context-aware responses

Example:

User: “Best shirts under 1000”

Bot: “Here are the top-rated shirts under 1000 from our catalog”

NLP for search optimization & autocomplete 🔍 AI Search Optimization

### Recommendation System:📦 Recommendation System

Custom Recommendation Engine

Based on reviews, wishlist, and user history

Collaborative Filtering (wishlist, user behavior)

Content-Based Filtering (product attributes)

Hybrid Model

Production Optimizations: Code splitting, lazy loading, caching, pagination

### Dataset:

flipkart.csv (40,000+ products) from Kaggle

Auto-category generation based on product names & attributes

### ⚙️ How It Works

Dataset Integration → flipkart.csv imported inside src/data/


Dynamic Categories → auto-created based on product attributes

AI Search → powered by OpenAI + NLP

Wishlist & Profile → stored in database, synced in real-time

Chatbot → powered by OpenAI API key in .env.local

CI/CD → GitHub Actions builds & deploys automatically

Deployment → Dockerized for production-ready environment

### 🐳 Docker Setup

# Build the Docker image

docker build -t favcom .

# Run the container

docker run -p 3000:3000 favcom

### 🔄 GitHub Actions CI/CD

On every push → Build app → Run tests → Deploy automatically

Ensures production mode build with optimized performance

### 📱 Responsiveness

Mobile First Design

Automatically adjusts UI/UX for Desktop, Tablet, and Mobile

# 📌 Future Improvements

Voice-enabled shopping assistant

Multi-language product search (NLP)

AI-powered fraud detection

Real-time order tracking with GPS integration

# 🚀 Quick Start

### Prerequisites:

->Node.js 18+

->Git

->OpenAI API key (optional, for AI features)

# we should place API key in under the Utils folder we should create an .env.local(file) and place API key there

# next in same folder create env.local.example same process and we should place our API key in both the "setup-env.js" and "setup.js"

'''# Available Scripts: #'''

# Development #

npm run dev     # Start development server

npm run build   # Build for production

npm run start   # Start production server

# Data Processing

npm run process:data    # Process product dataset

npm run setup           # Complete setup

# Docker #

npm run docker:build # Build Docker image

npm run docker:run # Run Docker container

# # # 🔄 Maintenance

# To update the application:

git pull origin main

npm install

npm run build

npm run dev

### 🤝 Contributing

1.Fork the repository

2.Create a feature branch

3.Make your changes

4.Submit a pull request

�� Project Structure
Here's the complete project structure for the FAVCOM e-commerce platform:

FAVCOM/
├── 📁 src/                          # Source code directory

│   ├── 📁 app/                      # Next.js App Router (Pages & API Routes)

│   │   ├── 📁 api/                  # Backend API endpoints

│   │   │   ├── 📁 cart/             # Shopping cart API

│   │   │   │   └── route.ts         # Cart operations (GET, POST, DELETE)

│   │   │   ├── �� chat/             # AI Chatbot API

│   │   │   │   └── route.ts         # OpenAI integration

│   │   │   ├── 📁 health/           # Health check API

│   │   │   │   └── route.ts         # System health monitoring

│   │   │   ├── 📁 products/         # Products API

│   │   │   │   └── route.ts         # Product search, filtering, pagination

│   │   │   ├── 📁 profile/          # User profile API

│   │   │   │   └── route.ts         # User data management

│   │   │   ├── �� recommendations/  # AI recommendations API

│   │   │   │   └── route.ts         # ML-powered product suggestions

│   │   │   └── 📁 wishlist/         # Wishlist API

│   │   │       └── route.ts         # Wishlist operations

│   │   ├── �� products/             # Product pages

│   │   │   ├── �� [id]/             # Dynamic product detail pages

│   │   │   │   └── page.tsx         # Individual product view

│   │   │   └── page.tsx             # Product listing page

│   │   ├── �� about/page.tsx        # About page

│   │   ├── 📄 admin/page.tsx        # Admin dashboard

│   │   ├── 📄 cart/page.tsx         # Shopping cart page

│   │   ├── 📄 contact/page.tsx      # Contact page

│   │   ├── 📄 help/page.tsx         # Help & support page

│   │   ├── 📄 login/page.tsx        # User login page

│   │   ├── 📄 privacy/page.tsx      # Privacy policy page

│   │   ├── 📄 profile/page.tsx      # User profile page

│   │   ├── 📄 register/page.tsx     # User registration page

│   │   ├── 📄 returns/page.tsx      # Returns policy page

│   │   ├── 📄 shipping/page.tsx     # Shipping information page

│   │   ├── �� terms/page.tsx        # Terms of service page

│   │   ├── 📄 wishlist/page.tsx     # User wishlist page

│   │   ├── 📄 favicon.ico           # Site favicon

│   │   ├── �� globals.css           # Global styles (Tailwind CSS)

│   │   ├── �� layout.tsx            # Root layout component

│   │   ├── 📄 not-found.tsx         # 404 error page

│   │   └── 📄 page.tsx              # Homepage

│   ├── 📁 components/               # Reusable React components

│   │   ├── 📄 ChatbotWidget.tsx     # AI chatbot interface

│   │   ├── �� ErrorBoundary.tsx     # Error handling component

│   │   ├── �� Footer.tsx            # Site footer

│   │   ├── 📄 LazyImage.tsx         # Optimized image loading

│   │   ├── 📄 LazyProductCard.tsx   # Lazy-loaded product cards

│   │   ├── 📄 LoadingSpinner.tsx    # Loading indicators

│   │   ├── 📄 Navbar.tsx            # Navigation bar

│   │   ├── �� PerformanceMonitor.tsx # Real-time performance metrics

│   │   ├── 📄 ProductCard.tsx       # Product display component

│   │   ├── 📄 RecommendationsSection.tsx # AI recommendations display

│   │   ├── 📄 SearchBar.tsx         # Search functionality

│   │   └── 📄 VirtualizedProductGrid.tsx # Virtual scrolling for large lists

│   ├── 📁 context/                  # React Context for state management

│   │   └── 📄 StoreContext.tsx      # Global app state (cart, wishlist, user)

│   ├── 📁 data/                     # Data files and datasets

│   │   ├── 📄 cart.json             # Cart data storage

│   │   ├── 📄 categories.json       # Product categories

│   │   ├── 📄 flipkart.csv          # Original Flipkart dataset (40K+ products)

│   │   ├── �� processed-products.json # Processed product data

│   │   ├── 📄 profile.json          # User profile data

│   │   └── �� wishlist.json         # Wishlist data storage

│   ├── 📁 lib/                      # Utility libraries and helpers

│   │   ├── 📄 cache.ts              # Caching utilities

│   │   ├── �� products.ts           # Product management functions

│   │   └── 📄 recommendation.ts     # AI recommendation engine

│   ├── 📁 scripts/                  # Data processing and utility scripts

│   │   └── 📄 process-flipkart-data.ts # Data processing pipeline

│   └── 📁 types/                    # TypeScript type definitions

│       └── 📄 index.ts              # Type definitions (Product, User, Order, etc.)

├── 📁 public/                       # Static assets

│   ├── 📄 file.svg                  # File icon

│   ├── 📄 globe.svg                 # Globe icon

│   ├── 📄 next.svg                  # Next.js logo

│   ├── 📄 vercel.svg                # Vercel logo

│   └── 📄 window.svg                # Window icon

├── 📄 .env.local.example            # Environment variables template

├── 📄 .gitignore                    # Git ignore rules

├── �� docker-compose.yml            # Docker Compose configuration

├── 📄 Dockerfile                    # Docker container configuration

├── 📄 eslint.config.mjs             # ESLint configuration

├── �� jest.config.js                # Jest testing configuration

├── 📄 jest.setup.js                 # Jest setup file

├── �� next.config.ts                # Next.js configuration

├── 📄 nginx.conf                    # Nginx configuration for production

├── 📄 package.json                  # Project dependencies and scripts

├── �� postcss.config.mjs            # PostCSS configuration

├── �� README.md                     # Project documentation

├── �� setup-env.js                  # Environment setup script

├── 📄 setup.js                      # Automated setup script

└── 📄 tsconfig.json                 # TypeScript configuration

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
