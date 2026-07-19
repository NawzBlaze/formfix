export async function compressToTargetKB(file: File, targetKB: number, type: 'jpeg'|'webp' = 'jpeg', onProgress?: (p:number)=>void, signal?: AbortSignal): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  let w = bmp.width, h = bmp.height;
  let quality = 0.92;
  const target = targetKB * 1024;
  let canvas = new OffscreenCanvas(w, h);
  let ctx = canvas.getContext('2d')! as any;
  ctx.drawImage(bmp, 0, 0);
  for (let i = 0; i < 12; i++) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const blob = await canvas.convertToBlob({ type: `image/${type}`, quality });
    onProgress?.(Math.round((i / 12) * 100));
    if (blob.size <= target) return blob;
    if (quality > 0.15) quality -= 0.12;
    else {
      const scale = Math.sqrt(target / blob.size) * 0.9;
      w = Math.max(16, Math.floor(w * scale));
      h = Math.max(16, Math.floor(h * scale));
      const nbmp = await createImageBitmap(await canvas.convertToBlob(), { resizeWidth: w, resizeHeight: h, resizeQuality: 'high' });
      const nc = new OffscreenCanvas(w, h);
      nc.getContext('2d')!.drawImage(nbmp, 0, 0);
      canvas = nc; quality = 0.8;
    }
  }
  return canvas.convertToBlob({ type: `image/${type}`, quality: 0.6 });
}

export async function resizeImage(file: File, w: number, h: number): Promise<Blob> {
  const bmp = await createImageBitmap(file, { resizeWidth: w, resizeHeight: h, resizeQuality: 'high' });
  const canvas = new OffscreenCanvas(w, h);
  canvas.getContext('2d')!.drawImage(bmp, 0, 0);
  return canvas.convertToBlob({ type: 'image/png' });
}

export function applyFilter(canvas: HTMLCanvasElement, filter: string): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = canvas.width; c.height = canvas.height;
  const ctx = c.getContext('2d')!;
  ctx.filter = filter; // 'blur(8px)' 'grayscale(1)' GPU
  ctx.drawImage(canvas, 0, 0);
  return c;
}
