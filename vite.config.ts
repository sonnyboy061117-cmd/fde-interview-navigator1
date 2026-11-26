import { cloudflare } from '@cloudflare/vite-plugin';
import { sites } from '@openai/sites-vite-plugin';
import { defineConfig } from 'vite';
import { vinext } from 'vinext';

export default defineConfig({plugins:[cloudflare({viteEnvironment:{name:'ssr'}}),sites(),vinext()]});
