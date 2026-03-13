# ⚙️ SteelCraft Workshop — Website

A modern, production-ready website for an industrial equipment & workshop machinery company. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools needed.

## 🚀 Deploy on Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Click **Deploy** — done!

## 📁 Project Structure

```
workshop-site/
├── index.html          ← Main website
├── css/
│   └── style.css       ← All website styles
├── js/
│   ├── data.js         ← All content data (machines, gallery, reviews)
│   └── main.js         ← Website functionality
├── admin/
│   ├── index.html      ← Admin panel
│   ├── admin.css       ← Admin styles
│   └── admin.js        ← Admin functionality
└── vercel.json         ← Vercel configuration
```

## 🔐 Admin Panel

Access: `yoursite.com/admin/`

Default credentials:
- **Username:** `admin`
- **Password:** `steelcraft2025`

> ⚠️ Change these immediately after first login in Settings → Change Password

### What the Admin Panel Can Do:
- ✅ Add / Edit / Delete machines with full specs
- ✅ Manage photo gallery (add/remove photos via URL)
- ✅ Add YouTube videos
- ✅ Add / Edit / Delete customer reviews
- ✅ Export all data as JSON backup
- ✅ Change login credentials

## 📝 Customization

### Update Contact Info
Edit `js/data.js` or use Admin Panel → Settings:
- Phone/WhatsApp number
- Email address
- Physical address

### Add Real Images
Replace Unsplash placeholder URLs with your actual product/workshop photos. You can:
- Upload to any image host (Cloudinary, ImgBB, etc.)
- Use Admin Panel to update URLs
- Or edit `js/data.js` directly

### Update Map
In `index.html`, find the `<iframe>` inside `.map-container` and replace the `src` with your Google Maps embed URL.

### WhatsApp Number
Search for `919876543210` in all files and replace with your actual WhatsApp number (country code + number, no + or spaces).

## 📊 Data Storage
All content is stored in the browser's **localStorage**. This means:
- Works without any backend
- Data persists across sessions on the same browser
- Export JSON regularly as backup

For a production deployment with persistent server-side storage, consider connecting a backend or CMS.

## 🎨 Color Scheme
- Background: `#0e0f11` (deep charcoal)
- Accent: `#f59e0b` (molten amber)
- Text: `#f1f5f9`

## 📱 Features
- Fully responsive (mobile, tablet, desktop)
- Machine filter by category
- Detailed machine modal with specs + gallery
- Infinite photo gallery with lightbox
- YouTube video embeds
- Smooth review carousel
- WhatsApp + Phone + Email contact
- Embedded Google Maps
- Animated hero with counter stats
- Scroll reveal animations
- Back to top button

---
Made with ⚙️ for SteelCraft Workshop, Kolkata
