# Pulsebeat Global

The Pulse of a New Generation - A modern media hub built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Hero Video**: Autoplay background video using YouTube embeds
- **Video Rails**: Horizontal scrolling sections with snap-to-scroll behavior
- **Categories**: Celebrities, Original Programming, News & Culture
- **Watch Pages**: Dedicated video viewing pages
- **SEO Optimized**: Built-in sitemap, robots.txt, and structured data
- **Mobile Responsive**: Optimized for all screen sizes
- **Fast Performance**: Minimal dependencies, optimized builds

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom Pulsebeat brand colors
- **TypeScript**: Full type safety
- **Video**: YouTube privacy-enhanced embeds
- **Fonts**: Inter via next/font/google

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.local.example .env.local
```

3. Update environment variables in `.env.local`:
- `NEXT_PUBLIC_SITE_URL`: Your site URL
- `NEXT_PUBLIC_PAYPAL_DONATE_URL`: PayPal donation link
- Social media URLs

4. Start development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Adding Content

### Adding New Videos

Edit `data/videos.json` to add new content:

```json
{
  "celebrities": [
    {
      "id": "unique-id",
      "title": "Video Title",
      "youTubeId": "YouTube-Video-ID",
      "tags": ["celebrity", "exclusive"]
    }
  ]
}
```

### Content Categories

- **celebrities**: Celebrity interviews and features
- **originals**: Original programming and series
- **culture**: News, culture, and trending content

## Brand Colors

- Gold: `#d4af37`
- Black: `#0a0a0a`
- Purple: `#6b2bbf`
- Indigo: `#3f51b5`
- White: `#ffffff`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The app is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

## License

Private project - All rights reserved.