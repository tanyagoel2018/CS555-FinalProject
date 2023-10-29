import "dotenv/config.js"


const cred = process.env.CREDENTIALS;
console.log(cred);

export const corsConfig = {
    origin: process.env.ORIGIN,
    credentials: true
}