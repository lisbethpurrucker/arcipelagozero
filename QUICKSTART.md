# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
cd sanity && npm install && cd ..
```

### Step 2: Create Sanity Project
```bash
cd sanity
npm create sanity@latest -- --project-plan free
# Follow prompts, note your project ID
cd ..
```

### Step 3: Configure Environment
```bash
# Copy and edit .env.local
cp .env.local.example .env.local
# Add your Sanity project ID

# Copy and edit sanity/.env.local
cp sanity/.env.local.example sanity/.env.local
# Add your Sanity project ID
```

### Step 4: Run Both Servers

**Terminal 1:**
```bash
npm run dev
# Visit http://localhost:3000
```

**Terminal 2:**
```bash
cd sanity
npm run dev
# Visit http://localhost:3333
```

### Step 5: Create Your First Page

1. Go to http://localhost:3333
2. Click "Page" → "Create"
3. Title: "Home"
4. Slug: "home"
5. Add some content blocks
6. Click "Publish"
7. Refresh http://localhost:3000 to see it!

## 📝 Creating Content

### Page Content
- Each page has Content Blocks
- Choose Text Block, Image Block, or Mixed Block
- Pick background colors (white, teal, cream)
- Publish to make live

### CRM Contacts
- Click "CRM Contact" in Sanity Studio
- Add name, email, phone, notes
- Track status (new → contacted → active)
- Perfect for managing clients/leads

## 🚀 Deploy to Production

### Frontend (Vercel)
```bash
# Push to GitHub first
git init && git add . && git commit -m "Initial"

# Then connect to Vercel
# Add environment variables in Vercel dashboard
```

### Sanity Studio
```bash
cd sanity
npm run deploy
```

Done! 🎉

---

Need help? Check the full README.md
