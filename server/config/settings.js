import "dotenv/config.js"

export const corsConfig = {
    origin: process.env.ORIGIN,
    credentials: process.env.CREDENTIALS
}