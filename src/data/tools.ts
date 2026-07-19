export interface Tool {
	id: string;
	title: string;
	href: string;
	desc: string;
}

export interface ToolCategory {
	id: string;
	label: string;
	desc: string;
	icon: string;
	tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
	{
		id: 'image',
		label: 'Image Tools',
		desc: 'Professional image processing, resizing, and manipulation.',
		icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
		tools: [
			{ id: 'compress-image', title: 'Image Compressor', href: '/compress-image', desc: 'Hit exact file-size targets' },
			{ id: 'compress-20kb', title: 'Compress to 20KB', href: '/compress-image-to-20kb', desc: 'For government form uploads' },
			{ id: 'compress-50kb', title: 'Compress to 50KB', href: '/compress-image-to-50kb', desc: 'For SSC/UPSC/Banking forms' },
			{ id: 'passport-photo-compressor', title: 'Passport Compressor', href: '/passport-photo-compressor', desc: 'Compress passport photos' },
			{ id: 'passport-maker', title: 'Passport Photo', href: '/passport-size-photo', desc: 'Official 3.5×4.5cm photos' },
			{ id: 'global-passport', title: 'Global Passport Photo', href: '/official-passport-photo-maker', desc: 'Any country dimensions' },
			{ id: 'crop-image', title: 'Crop Image', href: '/crop-image', desc: 'Precise cropping with ratios' },
			{ id: 'circle-crop', title: 'Circle Profile Maker', href: '/circle-crop', desc: 'Circular avatars for profiles' },
			{ id: 'resize-image', title: 'Resize Image', href: '/resize-image', desc: 'Custom pixel dimensions' },
			{ id: 'resize-image-for-platform', title: 'Resize for Social', href: '/resize-image-for-instagram', desc: 'One-click resize for social media' },
			{ id: 'background-remover', title: 'Background Remover', href: '/background-remover', desc: 'Remove solid backgrounds' },
			{ id: 'black-and-white', title: 'Black & White Filter', href: '/black-and-white', desc: 'Elegant grayscale conversion' },
			{ id: 'photo-to-sketch', title: 'Pencil Sketch', href: '/photo-to-sketch', desc: 'Turn photos into art' },
			{ id: 'convert-image', title: 'Format Converter', href: '/convert-image', desc: 'JPG ↔ PNG ↔ WebP' },
			{ id: 'blur-image', title: 'Blur & Censor', href: '/blur-image', desc: 'Redact sensitive info' },
			{ id: 'watermark-image', title: 'Add Watermark', href: '/watermark-image', desc: 'Protect your photos' },
		],
	},
	{
		id: 'pdf',
		label: 'Documents & PDF',
		desc: 'Merge, split, and extract documents completely offline.',
		icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
		tools: [
			{ id: 'merge-pdf', title: 'Merge PDF', href: '/merge-pdf', desc: 'Combine multiple PDFs' },
			{ id: 'split-pdf', title: 'Split PDF', href: '/split-pdf', desc: 'Extract specific pages' },
			{ id: 'rotate-pdf', title: 'Rotate PDF', href: '/rotate-pdf', desc: 'Fix upside-down pages' },
			{ id: 'image-to-pdf', title: 'Images to PDF', href: '/image-to-pdf', desc: 'Merge images into one PDF' },
			{ id: 'pdf-to-image', title: 'PDF to Images', href: '/pdf-to-image', desc: 'Extract pages as images' },
			{ id: 'resume-builder', title: 'Resume Builder', href: '/resume-builder', desc: 'Create professional resumes' },
			{ id: 'text-to-handwriting', title: 'Assignment Studio', href: '/text-to-handwriting', desc: 'Text to handwriting' },
			{ id: 'signature', title: 'Signature Maker', href: '/signature-maker', desc: 'Draw or type digital signatures' },
		],
	},
	{
		id: 'utilities',
		label: 'Utilities & Calculators',
		desc: 'Quick tools for everyday tasks and calculations.',
		icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
		tools: [
			{ id: 'qr-code-generator', title: 'QR Code Generator', href: '/qr-code-generator', desc: 'Custom QR codes with logo' },
			{ id: 'password-generator', title: 'Password Generator', href: '/password-generator', desc: 'Secure random passwords' },
			{ id: 'image-to-text', title: 'Image to Text (OCR)', href: '/image-to-text', desc: 'Extract text from images' },
			{ id: 'age-calculator', title: 'Age Calculator', href: '/age-calculator', desc: 'Exact age in years/months/days' },
			{ id: 'percentage-calculator', title: 'Percentage Calculator', href: '/percentage-calculator', desc: 'Quick percent calculations' },
			{ id: 'file-size-converter', title: 'File Size Converter', href: '/file-size-converter', desc: 'Bytes ↔ KB ↔ MB ↔ GB' },
		],
	},
];

export const allTools: Tool[] = toolCategories.flatMap((c) => c.tools);

export const popularToolIds = ['compress-image', 'merge-pdf', 'passport-maker', 'qr-code-generator', 'resume-builder', 'background-remover'];

export const imageToolIds = toolCategories.find((c) => c.id === 'image')!.tools.map((t) => t.id);
export const pdfToolIds = toolCategories.find((c) => c.id === 'pdf')!.tools.map((t) => t.id);
export const utilToolIds = toolCategories.find((c) => c.id === 'utilities')!.tools.map((t) => t.id);
