import { srcToWebP } from 'webp-converter-browser';

interface ConvertOptions {
  quality: number;
}

export async function pngToWebpBase64(pngBase64: string): Promise<string> {
    const options = {
      quality: 80,
    };
  
    const webpBlob = await srcToWebP(pngBase64, options);
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject();
      };
      reader.readAsDataURL(webpBlob);
    });
  }
  