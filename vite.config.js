import {mockRequestPlugin} from './server/mockPlugin.js';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdir, rm } from 'node:fs/promises'
import path from 'node:path'

async function removeAppleDoubleFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })

  await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name)
    if (entry.name.startsWith('._')) {
      await rm(entryPath, { force: true, recursive: entry.isDirectory() })
      return
    }
    if (entry.isDirectory()) await removeAppleDoubleFiles(entryPath)
  }))
}

function cleanAppleDoubleBuildArtifacts() {
  return {
    name: 'clean-apple-double-build-artifacts',
    async closeBundle() {
      await removeAppleDoubleFiles(path.resolve(process.cwd(), 'dist'))
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mockRequestPlugin(), react(), cleanAppleDoubleBuildArtifacts()],
})
