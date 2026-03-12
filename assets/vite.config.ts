import type { HmrContext, UserConfig, ViteDevServer } from 'vite'
import { execSync } from 'node:child_process'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ORIGIN_DOMAINS = ['http://localhost:4000']
const RE_NEWLINE = /\n/g

/**
 * https://github.com/LostKobrakai/phoenix_vite/blob/main/assets/js/index.ts
 */
function phoenixVitePlugin(opts: { pattern?: RegExp } = {}) {
  return {
    name: 'phoenix-vite',
    handleHotUpdate({ file, modules }: HmrContext) {
      if (!opts.pattern || !file.match(opts.pattern))
        return
      // replace current file module with importers, keep the rest
      return [...modules].flatMap((mod) => {
        if (mod.file === file)
          return [...mod.importers]
        return [mod]
      })
    },
    configureServer(_server: ViteDevServer) {
      process.stdin.on('close', () => {
        process.exit(0)
      })

      process.stdin.resume()
    },
  }
}

// Kill any lingering process on the port before starting the server
function killPortPlugin() {
  return {
    name: 'kill-port',
    config: (config: UserConfig) => {
      const port = config.server?.port || 5173

      try {
        const pids = execSync(`lsof -ti:${port}`, { encoding: 'utf-8' }).trim()

        if (pids) {
          execSync(`kill -9 ${pids}`)
          console.log(`\x1B[33m[kill-port]\x1B[0m Killed lingering process(es) on port ${port}: ${pids.replace(RE_NEWLINE, ', ')}`)
        }
      }
      catch {
        // No process on port, ignore
      }
    },
  }
}

export default defineConfig({
  plugins: [
    killPortPlugin(),
    phoenixVitePlugin({ pattern: /\\.(ex|heex)$/ }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    strictPort: true,
    origin: 'http://localhost:5173',
    cors: {
      origin: ORIGIN_DOMAINS,
    },
  },
  build: {
    target: 'es2020',
    outDir: '../priv/static',
    sourcemap: true,
    manifest: true,
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/app.tsx',
    },
  },
})
