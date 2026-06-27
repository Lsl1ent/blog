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

function readTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^#\s+(.+)/m)
    return match ? match[1].trim() : null
  } catch { return null }
}

function toTitleCase(str) {
  return str.replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

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

  srcExclude: ['**/drafts/**', '**/_draft*'],

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      ...CATEGORIES.map(c => ({ text: c.label, link: `/${c.dir}/` })),
    ],

    sidebar: buildSidebar(),

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Lsl1ent' },
    ],

    footer: {
      message: 'Powered by VitePress',
    },

    editLink: {
      pattern: 'https://github.com/Lsl1ent/blog/edit/main/docs/:path',
    },

    lastUpdated: {
      text: '最后更新',
    },
  }
}
