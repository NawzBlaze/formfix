import { z } from 'zod';
import { orientation } from 'exifr/dist/mini.esm.mjs';

export const imageSchema = z.instanceof(File).refine(f => ['image/png','image/jpeg','image/webp'].includes(f.type)).refine(f => f.size <= 20*1024*1024);
export function validateFile(file: File){ const r = imageSchema.safeParse(file); return r.success ? {valid:true} : {valid:false, error:'Invalid PNG/JPG/WebP max 20MB'}; }
export const sanitizeFilename = (n:string) => (n||'download').replace(/[^a-zA-Z0-9._-]/g,'_').slice(0,100);
export const revoke = (url:string|null) => { if(url?.startsWith('blob:')) URL.revokeObjectURL(url); };
export const readOrientation = async (f:File) => { try { return (await orientation(f))||1; } catch { return 1; } };
