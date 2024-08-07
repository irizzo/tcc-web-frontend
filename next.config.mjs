/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const nextConfig = {
	sassOptions: {
		includePaths: [ path.join(__dirname, 'styles'), path.join(__dirname, 'app'), '*/components/' ]
	},
	env: {
		currentEnv: process.env.CURRENT_ENV,
		prodBaseURL: process.env.PROD_BASEURL,
		devBaseURL: process.env.DEV_BASEURL
	},
	reactStrictMode: false
};

export default nextConfig;
