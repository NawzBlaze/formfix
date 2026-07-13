// FormFix Advanced Compression Worker (v3.0)
// Uses Binary Search + OffscreenCanvas for ultra-fast background processing

self.onmessage = async (e) => {
    const { imageBitmap, targetKB, format = 'image/jpeg', minQuality = 0.4 } = e.data;
    
    try {
        const targetBytes = targetKB * 1024;
        const TOLERANCE_BYTES = 1024; // ±1KB
        
        // Setup OffscreenCanvas
        const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
        const ctx = canvas.getContext('2d');
        if (!ctx) { self.postMessage({ success: false, error: 'Failed to get canvas context' }); return; }
        ctx.drawImage(imageBitmap, 0, 0);
        
        let low = minQuality, high = 1.0, quality = 0.8;
        let bestBlob = null;
        let currentBestSize = 0;

        // Binary Search Loop for Maximum Precision
        for (let i = 0; i < 11; i++) {
            quality = (low + high) / 2;
            const blob = await canvas.convertToBlob({ type: format, quality });
            
            if (blob.size <= targetBytes) {
                // Rule: Closest HIGHER value (prefer filling the target)
                if (blob.size > currentBestSize) {
                    bestBlob = blob;
                    currentBestSize = blob.size;
                }
                low = quality;
                // If we are within 1KB, we've hit the gold range
                if (targetBytes - blob.size < TOLERANCE_BYTES) break;
            } else {
                high = quality;
            }
        }

        // Final Micro-Pass: Try to squeeze closer if we have head-room
        if (bestBlob && (targetBytes - bestBlob.size > TOLERANCE_BYTES * 2) && low < 0.99) {
             const microStep = (high - low) / 4;
             const tryHigher = await canvas.convertToBlob({ type: format, quality: Math.min(0.99, low + microStep) });
             if (tryHigher.size <= targetBytes && tryHigher.size > bestBlob.size) {
                 bestBlob = tryHigher;
             }
        }

        // Fallback for extremely low targets
        if (!bestBlob) {
            bestBlob = await canvas.convertToBlob({ type: format, quality: 0.1 });
        }

        self.postMessage({ success: true, blob: bestBlob });
    } catch (err) {
        self.postMessage({ success: false, error: err.message });
    }
};
