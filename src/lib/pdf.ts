import { PDF } from '@libpdf/core';

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const merged = await PDF.create();
  for (const f of files) {
    const bytes = await f.arrayBuffer();
    const pdf = await PDF.load(new Uint8Array(bytes));
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((p: any) => merged.addPage(p));
  }
  return merged.save();
}

export async function pdfToImages(file: File, scale=2): Promise<Blob[]> {
  const pdfjs = await import('pdfjs-dist/build/pdf.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const out: Blob[] = [];
  for (let i=1;i<=pdf.numPages;i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = new OffscreenCanvas(viewport.width, viewport.height) as any;
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx as any, viewport } as any).promise;
    out.push(await canvas.convertToBlob({ type: 'image/png' }));
  }
  return out;
}
