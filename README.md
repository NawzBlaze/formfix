<div align="center">
  <img src="public/favicon.png" alt="FormFix Logo" width="80" />
  <h1>FormFix — Free Online Digital Toolkit</h1>
  <p><strong>30+ free, private, browser-based tools. No uploads. No login. No limits.</strong></p>

  <a href="https://formfix.pages.dev"><img src="https://img.shields.io/badge/🌐 Live Site-formfix.pages.dev-4f46e5?style=for-the-badge" alt="Live Site" /></a>
  <img src="https://img.shields.io/badge/Tools-30+-success?style=for-the-badge" alt="30+ Tools" />
  <img src="https://img.shields.io/badge/Privacy-100%25 Private-brightgreen?style=for-the-badge" alt="Private" />
  <img src="https://img.shields.io/badge/Cost-100%25 Free-orange?style=for-the-badge" alt="Free" />
  <img src="https://img.shields.io/badge/Built with-Astro-FF5D01?style=for-the-badge&logo=astro" alt="Astro" />
</div>

---

## ✨ What is FormFix?

**FormFix** is a privacy-first, browser-based digital toolkit with **30+ free tools** for students, job seekers, developers, and creators. Every tool runs **100% in your browser** — your files never leave your device, no server uploads, ever.

🌐 **Live at**: [formfix.pages.dev](https://formfix.pages.dev)

---

## 🛠️ Tools Available

### 🖼️ Image Suite
| Tool | Description |
|------|-------------|
| **[Compress Image](https://formfix.pages.dev/compress-image)** | Compress to exact KB (20KB, 50KB, 100KB) for govt forms |
| **[Passport Photo Maker](https://formfix.pages.dev/passport-size-photo)** | Official 3.5×4.5cm passport photos for SSC, UPSC |
| **[Background Remover](https://formfix.pages.dev/background-remover)** | Remove white/solid backgrounds from signatures |
| **[Crop Image](https://formfix.pages.dev/crop-image)** | Precise cropping with ratio presets |
| **[Resize Image](https://formfix.pages.dev/resize-image)** | Change dimensions in pixels |
| **[Circle Crop](https://formfix.pages.dev/circle-crop)** | Perfect circular avatars for CV & LinkedIn |
| **[B&W Filter](https://formfix.pages.dev/black-and-white)** | Convert photos to grayscale |
| **[Pencil Sketch](https://formfix.pages.dev/photo-to-sketch)** | Turn photos into pencil drawings |
| **[Blur & Censor](https://formfix.pages.dev/blur-image)** | Redact sensitive info from images |
| **[Watermark Image](https://formfix.pages.dev/watermark-image)** | Add text watermarks to protect photos |
| **[Format Converter](https://formfix.pages.dev/convert-image)** | Convert JPG ↔ PNG ↔ WebP |
| **[Digital Signature](https://formfix.pages.dev/signature-maker)** | Draw or type signatures in 65+ fonts |

### 📄 PDF Utilities
| Tool | Description |
|------|-------------|
| **[Merge PDF](https://formfix.pages.dev/merge-pdf)** | Combine multiple PDFs into one |
| **[Rotate PDF](https://formfix.pages.dev/rotate-pdf)** | Fix upside-down scanned PDFs |
| **[Images to PDF](https://formfix.pages.dev/image-to-pdf)** | Merge JPG/PNG images into a PDF |
| **[PDF to Images](https://formfix.pages.dev/pdf-to-image)** | Extract PDF pages as images |
| **[Split PDF](https://formfix.pages.dev/split-pdf)** | Separate specific pages from a PDF |

### 🔐 Utilities
| Tool | Description |
|------|-------------|
| **[QR Code Generator](https://formfix.pages.dev/qr-code-generator)** | Custom QR codes with logo & colors |
| **[Password Generator](https://formfix.pages.dev/password-generator)** | Military-grade secure passwords |
| **[Image to Text (OCR)](https://formfix.pages.dev/image-to-text)** | Extract text from any image |
| **[Resume Builder](https://formfix.pages.dev/resume-builder)** | Professional resume in 60 seconds |
| **[Text to Handwriting](https://formfix.pages.dev/text-to-handwriting)** | Convert text to realistic handwriting |
| **[File Size Converter](https://formfix.pages.dev/file-size-converter)** | Bytes ↔ KB ↔ MB ↔ GB calculator |
| **[Age Calculator](https://formfix.pages.dev/age-calculator)** | Exact age in years, months, days |
| **[Percentage Calculator](https://formfix.pages.dev/percentage-calculator)** | Quick percentage calculations |

---

## 🚀 Why FormFix?

- 🔒 **100% Private** — All processing happens in your browser. Zero server uploads.
- ⚡ **Instant Results** — No waiting, no queues, no account needed.
- 🌍 **Works Everywhere** — Desktop, tablet, and mobile optimized.
- 💸 **Always Free** — No paywalls, no premium tiers.
- 📱 **PWA Ready** — Install as an app on your phone.

---

## 🏗️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **[Astro](https://astro.build)** | Static site framework |
| **Vanilla CSS** | Custom design system v7.0 |
| **TypeScript** | Tool logic |
| **[Cloudflare Pages](https://pages.cloudflare.com)** | Hosting & CDN |
| **pdf-lib** | Client-side PDF processing |
| **@imgly/background-removal** | AI background removal |
| **qr-code-styling** | QR code generation |
| **canvas-confetti** | Celebration effects 🎉 |

---

## 🖥️ Running Locally

```bash
# Clone the repo
git clone https://github.com/NawzBlaze/formfix.git
cd formfix

# Install dependencies (uses Bun)
bun install

# Start dev server
bun run dev

# Build for production
bun run build
```

Dev server will start at **http://localhost:4321**

---

## 📁 Project Structure

```
formfix/
├── public/
│   ├── favicon.png          # Logo
│   ├── sitemap.xml          # XML Sitemap
│   ├── robots.txt           # Crawler config
│   └── _headers             # Cloudflare security headers
├── src/
│   ├── components/
│   │   ├── BaseLayout.astro  # Main HTML layout + SEO
│   │   ├── Header.astro      # Navigation with mobile drawer
│   │   ├── Footer.astro      # Footer with all tool links
│   │   └── RelatedTools.astro # Related tools section
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── compress-image.astro
│   │   ├── signature-maker.astro
│   │   └── ... (30+ pages)
│   └── styles/
│       └── global.css        # Design system v7.0
└── astro.config.mjs
```

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to suggest a new tool:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-tool`)
3. Commit your changes (`git commit -m 'Add new tool'`)
4. Push to the branch (`git push origin feature/new-tool`)
5. Open a Pull Request

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">
  <p>Made with ❤️ for students, creators, and professionals worldwide</p>
  <a href="https://formfix.pages.dev">🌐 formfix.pages.dev</a>
</div>
