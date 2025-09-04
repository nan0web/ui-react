import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	base: "/",
	plugins: [react()],
	// root: './playground',
	// publicDir: './public',
	build: {
		outDir: './dist/playground',
		rollupOptions: {
			input: {
				main: './index.html',
			},
		},
	}
})
