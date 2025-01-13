import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();
const envFile = `.env.${process.env.EXECUTION_ENV || 'dev'}`;

if (fs.existsSync(envFile)) {
    dotenv.config({path: envFile});
} else {
    dotenv.config();
}

export const envConfig = {
    executionEnv: process.env.EXECUTION_ENV,
    baseUrl: process.env.BASE_URL || 'dev',
    headless: process.env.HEADLESS === 'true',
    username: process.env.USER_NAME,
    password: process.env.PASSWORD
};