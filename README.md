# Minimal Site - Next.js + Sanity CMS

A beautiful, minimal website with content management system built with Next.js 14 and Sanity CMS.

## Features

- 🎨 Clean, minimal design with dotted grid background
- 📝 Full content management through Sanity Studio
- 🎯 6 main pages: Home, Vision, Agenda, Stays, Journey, Members
- 👥 Built-in CRM for managing contacts
- 📱 Fully responsive design
- ⚡ Fast and optimized with Next.js 14
- 🎨 Tailwind CSS for styling
- 🔒 Type-safe with TypeScript

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity v3
- **Deployment**: Vercel (frontend) + Sanity Cloud (CMS)

## Project Structure

```
project/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── vision/            # Vision page
│   ├── agenda/            # Agenda page
│   ├── stays/             # Stays page
│   ├── journey/           # Journey page
│   ├── members/           # Members page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Sidebar navigation
│   ├── Footer.tsx         # Footer
│   ├── PageHeader.tsx     # Page headers
│   └── ContentBlock.tsx   # Content block renderer
├── lib/                   # Utilities
│   ├── sanity.ts          # Sanity client
│   └── types.ts           # TypeScript types
├── sanity/                # Sanity Studio
│   ├── schemas/           # Content schemas
│   └── sanity.config.ts   # Sanity configuration
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

First, install the main project dependencies:

```bash
npm install
```

Then install Sanity Studio dependencies:

```bash
cd sanity
npm install
cd ..
```

### 2. Set Up Sanity Project

1. **Create a Sanity account** (if you don't have one):
   - Go to [sanity.io](https://www.sanity.io/)
   - Sign up or log in

2. **Create a new Sanity project**:
   ```bash
   cd sanity
   npm create sanity@latest -- --project-plan free
   ```
   
   Follow the prompts:
   - Use existing account
   - Create new project (choose a name)
   - Use default dataset configuration (production)
   - Output path: current directory
   - Select project template: Clean project

3. **Get your Project ID**:
   - After creation, note your `projectId`
   - Or find it at [sanity.io/manage](https://www.sanity.io/manage)

### 3. Configure Environment Variables

**For the Next.js app** (root directory):

Create `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id-here"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
```

**For Sanity Studio** (sanity directory):

Create `sanity/.env.local`:

```bash
cd sanity
cp .env.local.example .env.local
```

Edit `sanity/.env.local`:

```env
SANITY_STUDIO_PROJECT_ID="your-project-id-here"
SANITY_STUDIO_DATASET="production"
```

Also update `sanity/sanity.cli.ts` with your project ID.

### 4. Run Locally

Open two terminal windows:

**Terminal 1 - Next.js frontend:**
```bash
npm run dev
```
Visit http://localhost:3000

**Terminal 2 - Sanity Studio:**
```bash
cd sanity
npm run dev
```
Visit http://localhost:3333

### 5. Add Initial Content in Sanity Studio

1. Go to http://localhost:3333
2. Create your pages:
   - Click "Page" in the sidebar
   - Create pages with these slugs:
     - `home` (title: "Home")
     - `vision` (title: "Vision")
     - `agenda` (title: "Agenda")
     - `stays` (title: "Stays")
     - `journey` (title: "Journey")
     - `members` (title: "members")
3. Add content blocks to each page:
   - Click "+ Add item" under Content Blocks
   - Choose Text Block, Image Block, or Mixed Block
   - Fill in content and choose background colors
4. Publish each page

### 6. Using the CRM

The built-in CRM allows you to manage contacts:

1. In Sanity Studio, click "CRM Contact"
2. Click "Create" to add a new contact
3. Fill in:
   - Name (required)
   - Email (required)
   - Phone (optional)
   - Notes (optional)
   - Status (new/contacted/active/archived)
4. Save and publish

You can search, filter, and manage all contacts from Sanity Studio.

## Deployment

### Deploy Frontend to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables (from `.env.local`)
   - Click "Deploy"

### Deploy Sanity Studio

1. **Build and deploy**:
   ```bash
   cd sanity
   npm run build
   npm run deploy
   ```

2. **Configure CORS** (important!):
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Select your project
   - Go to "API" → "CORS Origins"
   - Add your Vercel domain (e.g., `https://your-site.vercel.app`)
   - Add your Studio domain (e.g., `https://your-studio.sanity.studio`)

## Content Management Guide for Owner

### Accessing Sanity Studio

After deployment, you can access Sanity Studio at:
- Local: http://localhost:3333
- Production: https://your-project.sanity.studio

### Editing Content

**To update page content:**
1. Log into Sanity Studio
2. Click "Page" in the left sidebar
3. Select the page you want to edit
4. Add, remove, or edit content blocks
5. Click "Publish" to make changes live

**Content Block Types:**
- **Text Block**: Just text with background color
- **Image Block**: Just an image
- **Mixed Block**: Image and text side-by-side

**Background Colors:**
- White: Clean background
- Teal: Dark teal (#4A5F5E)
- Cream: Soft beige (#E8E5D5)

### Managing CRM Contacts

1. Click "CRM Contact" in the sidebar
2. View all contacts in a list
3. Click any contact to edit
4. Use filters to find specific contacts
5. Update status as relationships progress

### Tips

- Changes appear on the website within a few seconds
- You can preview changes before publishing
- All images are automatically optimized
- Use descriptive alt text for images (important for accessibility)

## Customization

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'teal-dark': '#4A5F5E',  // Change this
  'cream': '#E8E5D5',       // And this
}
```

### Changing Fonts

Edit `app/layout.tsx` to import different Google Fonts.

### Adding New Pages

1. Create new route in `app/` directory
2. Add page to navigation in `components/Navigation.tsx`
3. Create corresponding page in Sanity Studio

## Troubleshooting

**"Cannot connect to Sanity"**
- Check your `.env.local` file has the correct project ID
- Make sure Sanity Studio is running
- Verify CORS settings in Sanity dashboard

**"Page not found"**
- Create the page in Sanity Studio first
- Make sure the slug matches exactly (e.g., "home" not "Home")
- Publish the page

**Images not loading**
- Check `next.config.js` includes `cdn.sanity.io` in image domains
- Verify images are published in Sanity Studio

## Support

For issues with:
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Sanity**: [Sanity Documentation](https://www.sanity.io/docs)
- **Deployment**: [Vercel Documentation](https://vercel.com/docs)

## License

Private project - All rights reserved

---

Built with ❤️ using Next.js and Sanity
