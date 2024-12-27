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
    //#### env config ####
    executionEnv: process.env.EXECUTION_ENV,

    //#### urls ####
    baseUrl: process.env.BASE_URL || 'dev',

    //#### browser config ####
    headless: process.env.HEADLESS === 'true',

    //#### credentials ####
    username: process.env.USER_NAME || '',
    password: process.env.PASSWORD || '',

    //#### report portal config ####
    projectName: process.env.PROJECT_NAME
};