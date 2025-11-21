# 🔗 TinyLink – URL Shortener (Node.js + Express + MongoDB + React)

TinyLink is a full-stack URL shortener application inspired by Bitly.  
It allows users to create short URLs, track click statistics, delete links, and view a clean, responsive dashboard.

This project was built as part of a take-home assignment and includes:

- Node.js + Express backend  
- MongoDB (Mongoose) database  
- React.js frontend with TailwindCSS  
- Fully REST-compliant API with validation  
- Click tracking & last-clicked timestamp  
- Public redirect route  
- Stats page for each short code  
- Deployment-ready structure  

---

## 📌 Features

### ✔ Short Link Creation
- Create short URLs with automatic or custom short codes  
- Validates URL format  
- Ensures short codes are globally unique  
- Returns JSON containing the full short URL  

### ✔ Redirection (`/:code`)
Visiting a short code:
- Redirects user with HTTP 302  
- Increments click counter  
- Updates `lastClicked` timestamp  

### ✔ Dashboard (`/`)
A React UI that shows:
- All short links  
- Target URL  
- Total clicks  
- Last clicked time  
- Buttons to copy, view stats, and delete links  
- Search/filter (optional)  

### ✔ Stats Page (`/code/:code`)
Shows detailed analytics for a specific link:
- Original URL  
- Creation date  
- Last clicked  
- Total clicks  

### ✔ Delete Functionality
Users can delete any short link.  
After deletion:
- Redirect route returns 404  
- Dashboard updates  

### ✔ Health Check (`/healthz`)
Returns:
```json
{ "ok": true, "version": "1.0" }