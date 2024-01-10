import dotenv from 'dotenv';
dotenv.config()

const config = {
    paraphraseApiEndpoint : process.env["PARAPHRASE_API_ENDPOINT"] || "https://paraphraser.prod.hipcv.com/paraphrase",
}

export default config;