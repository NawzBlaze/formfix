# 🚀 FormFix: Professional Multi-Tool Platform

[![Deploy Status](https://github.com/NawzBlaze/formfix/actions/workflows/deploy.yml/badge.svg)](https://formfix.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20Client--Side-brightgreen)](https://formfix.pages.dev/privacy)

**FormFix** is a high-performance, privacy-first, and SEO-optimized multi-tool suite designed for modern web tasks. Built with **Astro** for extreme speed, it processes images, PDFs, and data strictly in the user's browser—meaning your files never touch a server.

---

## 💎 Features

### 📸 Image Suite
- **Smart Compressor**: Hit exact file targets (20KB, 50KB, 100KB) with ±1KB accuracy using the RBQS engine.
- **Pro Cropper**: Precision cropping with aspect ratio presets (1:1, 16:9, etc.) and alignment grids.
- **Circle Profile Maker**: Generate perfectly rounded avatars for LinkedIn and social media.
- **Background Remover**: Securely erase solid backgrounds using our "Magic Eraser" light AI.
- **Censor & Blur**: Paint-to-blur sensitive information or pixelate license plates/faces.
- **Watermark Engine**: Protect photography with custom text overlays and transparency control.

### 📄 PDF Utilities
- **Image to PDF**: Batch merge JPG/PNG images into professional PDF documents.
- **PDF to Image**: Extract high-resolution pages as JPG or ZIP archives.

### 🧮 Smart Calculators
- **File Size Converter**: Highly accurate binary-scale KB/MB/GB conversions.
- **Percentage Calculator**: Real-time calculations for growth, discounts, and differences.
- **Age Calculator**: Exact chronological age breakdown (Years, Months, Days).

---

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation)
- **Runtime**: [Bun](https://bun.sh/) / [Node.js](https://nodejs.org/)
- **Processing**: HTML5 Canvas, JavaScript (Client-side)
- **Libraries**:
  - `jspdf` for PDF generation
  - `pdfjs-dist` for PDF parsing
  - `jszip` for batch downloads
- **Styling**: Vanilla CSS (Custom Glassmorphism Design System)

---

## ⚡ Quick Start

### Prerequisites
- [Bun](https://bun.sh/) (Recommended) or [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NawzBlaze/formfix.git
   cd formfix
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start Development Server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. **Build for Production**
   ```bash
   bun run build
   # or
   npm run build
   ```

---

## 🌐 SEO & Deployment

The project is structured for high SEO visibility with:
- **XML Sitemaps** (Auto-updated)
- **Structured JSON-LD Data**
- **Interactive FAQ Schema**
- **Internal Linking Engine**

**Live Demo**: [https://formfix.pages.dev](https://formfix.pages.dev)

---

## 🛡️ License

This project is licensed under the **MIT License**. Feel free to use it for personal or commercial projects. See [LICENSE](./LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow the conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `ui:` for design/aesthetic changes
- `refactor:` for code cleanups

---

<p align="center">Made with ❤️ for a faster, safer web.</p>
