import { ImageAnnotatorClient } from '@google-cloud/vision';
import path from 'path';
import fs from 'fs';

async function analyzeImage(Image) {
    try {
        const keyFilePath = path.resolve('./client_secret_100655805930-o5g2t9v3o7bbqes6mj8rjndtu1fsf2ib.apps.googleusercontent.com.json');

        // Check if the credentials file exists
        if (!fs.existsSync(keyFilePath)) {
            throw new Error(`Credentials file not found at path: ${keyFilePath}`);
        }

        const client = new ImageAnnotatorClient({
            keyFilename: keyFilePath
        });

        const [result] = await client.textDetection(Image);
        return result.textAnnotations;
    } catch (error) {
        console.error("Error analyzing image: ", error);
    }
}

(async () => {
    const Image = './handwritten.jpg';
    const result = await analyzeImage(Image);
    console.log(result);
})();
