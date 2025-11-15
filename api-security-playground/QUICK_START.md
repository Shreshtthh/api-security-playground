# 🚀 Quick Start Guide - API Security Playground

## You're All Set! 🎉

The API Security Playground is fully built and running at:
**http://localhost:3000**

## 📋 What to Do Next

### 1. Open Your Browser
Visit: **http://localhost:3000**

You'll see a beautiful landing page with:
- Hero section explaining the project
- Feature showcase
- "How It Works" section
- Call-to-action buttons

### 2. Launch the Playground
Click the **"Launch Playground"** button or visit:
**http://localhost:3000/playground**

### 3. Try Your First Challenge

#### Challenge: SQL Injection
1. Click **"Try Challenge"** on the "Bypass Login Authentication" card
2. You'll see a code editor with JSON payload
3. Replace the payload with:
   ```json
   {
     "username": "admin' OR '1'='1",
     "password": "anything"
   }
   ```
4. Click **"Test Attack"**
5. Watch the magic happen! ✨

**What you'll see:**
- Request sent to the vulnerable endpoint
- Response shows "Login successful (SQL Injection worked!)"
- Red "Vulnerable!" badge appears
- Nest Scanner provides security analysis
- Challenge marked as completed
- Progress tracker updates

## 🎯 Try All 4 Challenges

### Challenge 1: SQL Injection ⚡ (Easy)
**Endpoint:** POST /api/mock/login

**Exploit Payload:**
```json
{
  "username": "admin' OR '1'='1",
  "password": "anything"
}
```

**What it does:** Bypasses authentication by injecting SQL that makes the WHERE clause always true.

---

### Challenge 2: Broken Authentication 🔓 (Medium)
**Endpoint:** GET /api/mock/user/profile

**Exploit Payload:**
```json
{
  "headers": {
    "Authorization": "Bearer expired"
  }
}
```

**What it does:** Accesses protected resources with an expired/invalid token.

---

### Challenge 3: Excessive Data Exposure 📊 (Easy)
**Endpoint:** GET /api/mock/users

**Exploit Payload:**
```json
{}
```

**What it does:** Reveals sensitive fields like `password_hash`, `ssn`, `api_key` that shouldn't be exposed.

---

### Challenge 4: Mass Assignment 👤 (Medium)
**Endpoint:** PUT /api/mock/user/update

**Exploit Payload:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "is_verified": true
}
```

**What it does:** Escalates privileges by modifying protected fields like `role` and `is_verified`.

## 🎨 Features to Explore

### In the Playground:
- ✅ **Code Editor** - Modify JSON payloads in real-time
- ✅ **Request/Response Viewer** - See exactly what's sent and received
- ✅ **Nest Scanner** - Get professional security analysis
- ✅ **Hints System** - Click "Show Hints" for guidance
- ✅ **Progress Tracker** - Track completed challenges
- ✅ **OWASP Links** - Learn more about each vulnerability

### On the Landing Page:
- ✅ **Hero Section** - Eye-catching introduction
- ✅ **Features Grid** - 6 key features highlighted
- ✅ **How It Works** - 3-step process
- ✅ **Call-to-Action** - Multiple entry points

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📁 Project Structure at a Glance

```
api-security-playground/
├── app/                    # Next.js app router
│   ├── page.tsx           # Landing page
│   ├── playground/        # Playground interface
│   └── api/               # API routes
├── components/            # React components
│   ├── landing/          # Landing page components
│   ├── playground/       # Playground components
│   └── ui/               # Reusable UI components
├── lib/                  # Business logic
│   ├── nest-api.ts      # API integration
│   └── vulnerabilities.ts # Challenge data
└── types/               # TypeScript types
```

## 🐛 Troubleshooting

### Port 3000 Already in Use?
```bash
# Windows: Kill the process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors?
The project includes some intentional "vulnerabilities" for educational purposes. These are safe to ignore in development.

## 🎓 Learning Path

1. **Start Easy:** Try SQL Injection first
2. **Understand Responses:** Read what the API returns
3. **Check Scanner:** See Nest API's analysis
4. **Read OWASP:** Click the links to learn more
5. **Challenge Yourself:** Try other vulnerabilities
6. **Track Progress:** Complete all 4 challenges

## 🚀 Deployment (Optional)

Ready to deploy? Here's how:

### Vercel (Easiest)
1. Push to GitHub
2. Import to Vercel
3. Deploy automatically
4. Done! 🎉

### Manual Deployment
1. Run: `npm run build`
2. Upload `.next` folder to server
3. Run: `npm start`
4. Access via your domain

## 📝 Customization Tips

### Change Challenge Content
Edit: `lib/vulnerabilities.ts`

### Modify UI Colors
Edit: `tailwind.config.ts` and component className props

### Add New Endpoints
Edit: `app/api/mock/[...path]/route.ts`

### Update Landing Page
Edit: `app/page.tsx` and `components/landing/*`

## 🎉 Success Checklist

- ✅ Development server running
- ✅ Landing page loads correctly
- ✅ Playground interface works
- ✅ All 4 challenges functional
- ✅ Request/response visualization working
- ✅ Nest Scanner providing feedback
- ✅ Progress tracking updating
- ✅ Build completes successfully

## 💡 Pro Tips

1. **Open DevTools** (F12) to see network requests
2. **Try Wrong Payloads** to see what doesn't work
3. **Read Hints** if you're stuck
4. **Check Solutions** in challenge definitions
5. **Share Your Score** with friends!

## 🌟 What Makes This Special

- **Hands-On Learning** - Actually exploit vulnerabilities
- **Safe Environment** - No real systems harmed
- **Real-Time Feedback** - Instant results
- **OWASP Aligned** - Industry-standard curriculum
- **Beautiful UI** - Modern, professional design
- **Production Ready** - Deploy immediately

## 📞 Need Help?

- Check `PROJECT_SUMMARY.md` for detailed info
- Read `README.md` for documentation
- Examine code comments for explanations
- Review TypeScript types in `types/index.ts`

## 🎯 Your Mission

**Complete all 4 challenges and become an API security expert!**

Each challenge teaches you:
- How attackers exploit vulnerabilities
- What makes code vulnerable
- How to fix security issues
- OWASP best practices

## 🏆 Challenge Accepted?

Open your browser to **http://localhost:3000** and start hacking! 🛡️

---

**Remember:** This is a learning environment. Always practice ethical hacking and never test on systems you don't own or have permission to test.

Happy Hacking! 🚀
