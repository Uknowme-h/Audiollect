import { createWorker } from 'tesseract.js';

// import { ImageAnnotatorClient } from '@google-cloud/vision';
// import path from 'path';
// import fs from 'fs';

// async function analyzeImage(Image) {
//     try {
//         const keyFilePath = path.resolve('./config.json');

//         // Check if the credentials file exists
//         if (!fs.existsSync(keyFilePath)) {
//             throw new Error(`Credentials file not found at path: ${keyFilePath}`);
//         }

//         const client = new ImageAnnotatorClient({
//             keyFilename: keyFilePath
//         });

//         const [result] = await client.textDetection(Image);
//         return result.textAnnotations;
//     } catch (error) {
//         console.error("Error analyzing image: ", error);
//     }
// }

// (async () => {
//     const Image = './handwritten.jpg';
//     const result = await analyzeImage(Image);
//     console.log(result);
// })();

async function analyzeImageWithTesseract(imageUrl) {
    const worker = await createWorker();
    const { data: { text } } = await worker.recognize(imageUrl);
    await worker.terminate();
    return text;
}

export default analyzeImageWithTesseract;


