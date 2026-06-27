import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = path.resolve(__dirname, '..')

const CATEGORIES = [
  { dir: 'frontend', label: '前端' },
  { dir: 'backend',  label: '后端' },
  { dir: 'database', label: '数据库' },
  { dir: 'devops',   label: 'DevOps' },
  { dir: 'misc',     label: '杂项' },
]

// --- Sidebar auto-discovery ---

/** Extract the first H1 title from a markdown file */
function readTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^#\s+(.+)/m)
    return match ? match[1].trim() : null
  } catch { return null }
}

/** Convert kebab-case to Title Case */
function toTitleCase(str) {
  return str.replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * Auto-generate sidebar items by scanning a directory for .md files.
 * Skips files starting with "_" (internal) and "index.md" (section root).
 */
function autoSidebar(dirName, label) {
  const dirPath = path.join(DOCS_DIR, dirName)
  if (!fs.existsSync(dirPath)) return [{ text: label, items: [] }]

  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.md') && !f.startsWith('_') && f !== 'index.md')
    .map(f => {
      const name = f.replace(/\.md$/, '')
      const title = readTitle(path.join(dirPath, f)) || toTitleCase(name)
      return { text: title, link: `/${dirName}/${name}` }
    })

  return [{ text: label, items: files }]
}

function buildSidebar() {
  const sidebar = {}
  for (const { dir, label } of CATEGORIES) {
    sidebar[`/${dir}/`] = autoSidebar(dir, label)
  }
  return sidebar
}

// --- Config ---

export default {
  title: 'My Notes',
  description: 'Personal learning notes',
  lang: 'zh-CN',
  cleanUrls: true,

  // Exclude draft articles from production build
  srcExclude: ['**/drafts/**', '**/_draft*'],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: buildSidebar(),

    search: {
      provider: 'local'
    }
  }
}
