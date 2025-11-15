# 🛡️ API Security Playground

> Learn API security by exploiting vulnerabilities in a safe, interactive environment. Powered by Nest API.

## 🎯 Overview

API Security Playground is an interactive web application where developers can learn about API vulnerabilities by actually exploiting them in a controlled environment. Built for the Nest API Hackathon, it combines hands-on learning with real-time security scanning powered by the Nest API.

### ✨ Key Features

- **🎮 Interactive Challenges**: Exploit real vulnerabilities including SQL injection, broken authentication, excessive data exposure, and mass assignment
- **🔍 Real-time Scanning**: Integrated Nest API provides instant security analysis and vulnerability detection
- **📚 Educational Focus**: OWASP API Security Top 10 aligned with detailed explanations and remediation advice
- **💻 Clean Interface**: Built with Next.js 14 and Tailwind CSS for a polished user experience
- **📈 Progress Tracking**: Gamified learning with challenge completion tracking

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+ and npm
Nest API key (optional - works with mock data)
```

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/api-security-playground.git
cd api-security-playground

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your NEST_API_KEY to .env.local (optional)

# Run development server
npm run dev
```

Visit `http://localhost:3000` to start learning!

## 🎓 How It Works

1. **Choose a Challenge**: Select from 4+ OWASP-aligned vulnerability types
2. **Craft Your Attack**: Use the interactive code editor to create malicious payloads
3. **See Results**: Watch your request/response in real-time
4. **Learn from Nest**: Get instant security analysis and remediation steps

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Next.js   │─────▶│  Mock APIs   │─────▶│  Nest API   │
│  Frontend   │      │ (Vulnerable) │      │   Scanner   │
└─────────────┘      └──────────────┘      └─────────────┘
       │                     │                      │
       │                     ▼                      ▼
       │              Exploit Success?      Vulnerability Report
       │                     │                      │
       └─────────────────────┴──────────────────────┘
                    Real-time Feedback
```

### Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Custom components with lucide-react icons
- **API Integration**: Nest API SDK (custom wrapper)
- **Deployment**: Vercel (recommended)

## 🧪 Available Challenges

| Challenge | OWASP ID | Difficulty | Description |
|-----------|----------|------------|-------------|
| SQL Injection | API8:2023 | Easy | Bypass login authentication with malicious SQL |
| Broken Authentication | API2:2023 | Medium | Access protected resources with expired tokens |
| Excessive Data Exposure | API3:2023 | Easy | Identify sensitive data leaks in API responses |
| Mass Assignment | API6:2023 | Medium | Escalate privileges through unfiltered input |

## 🔧 Configuration

### Environment Variables
```bash
# Nest API Configuration
NEST_API_URL=https://api.nest.example.com
NEST_API_KEY=your_api_key_here

# Optional: Enable debug logging
DEBUG_MODE=false
```

### Customization

Add more challenges in `lib/vulnerabilities.ts`:
```typescript
export const CHALLENGES: Challenge[] = [
  {
    id: 'your-challenge-id',
    vulnerabilityId: 'owasp-category',
    title: 'Your Challenge Title',
    description: 'What users need to do',
    endpoint: '/api/mock/your-endpoint',
    method: 'POST',
    hints: ['Hint 1', 'Hint 2'],
    solution: 'Explanation of the solution',
    testPayload: { /* initial payload */ }
  }
];
```

## 📦 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Don't forget to add your `NEST_API_KEY` to Vercel environment variables!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nest API** for providing the security scanning infrastructure
- **OWASP** for the API Security Top 10 framework
- Built for the Nest API Hackathon 2024

## 📧 Contact

Project Link: [https://github.com/yourusername/api-security-playground](https://github.com/yourusername/api-security-playground)

---

<div align="center">
  Made with ❤️ for developers learning API security
</div>

