<div align="center">

# DesignConstraintValidator

**A validation tool that checks UI designs against real-world web constraints like safe areas, touch targets, and contrast ratios.**

![React](https://img.shields.io/badge/React-333?style=flat-square) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-333?style=flat-square) ![Canvas API](https://img.shields.io/badge/Canvas%20API-333?style=flat-square)
![Utility Tool](https://img.shields.io/badge/Utility-Tool-success?style=flat-square)
![Type](https://img.shields.io/badge/Type-Web%20App-blue?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-14%2F14-brightgreen?style=flat-square)

</div>

---

## Problem

UI Designers create designs that are impossible to implement without knowing web constraints like viewport limits, safe areas, or minimum touch targets.

## Who Is This For?

Frontend developers and UI designers collaborating on web projects

## Features

- **Input design specs (width, height, colors, font sizes)**
- **Real-time constraint validation against WCAG and mobile standards**
- **Generate shareable constraint report**

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React | Core dependency |
| Tailwind CSS | Core dependency |
| Canvas API | Core dependency |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/malikmuhammadsaadshafiq-dev/mvp-designconstraintvalidator.git
cd mvp-designconstraintvalidator
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Core Workflows

**1. Input design specs (width, height, colors, font sizes)**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**2. Real-time constraint validation against WCAG and mobile standards**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**3. Generate shareable constraint report**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time


## Quality Assurance

| Test | Status |
|------|--------|
| Has state management | ✅ Pass |
| Has form/input handling | ✅ Pass |
| Has click handlers (2+) | ✅ Pass |
| Has demo data | ✅ Pass |
| Has loading states | ✅ Pass |
| Has user feedback | ✅ Pass |
| No placeholder text | ✅ Pass |
| Has CRUD operations | ✅ Pass |
| Has empty states | ✅ Pass |
| Has responsive layout | ✅ Pass |
| Has search/filter | ✅ Pass |
| Has tab navigation | ✅ Pass |
| Has data persistence | ✅ Pass |
| No dead links | ✅ Pass |

**Overall Score: 14/14**

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   └── components/       # Reusable UI components
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS config
└── tsconfig.json         # TypeScript config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — use freely for personal and commercial projects.

---

<div align="center">

**Built autonomously by [Openclaw MVP Factory](https://github.com/malikmuhammadsaadshafiq-dev/Openclaw)** — an AI-powered system that discovers real user needs and ships working software.

</div>
