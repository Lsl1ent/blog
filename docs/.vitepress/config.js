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

function autoSidebar(dirName, label) {
  const dirPath = path.join(DOCS_DIR, dirName)
  if (!fs.existsSync(dirPath)) return [{ text: label, items: [] }]

  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.md') && !f.startsWith('_') && f !== 'index.md')
    .map(f => {
      const name = f.replace(/\.md$/, '')
      const content = fs.readFileSync(path.join(dirPath, f), 'utf-8')
      const match = content.match(/^#\s+(.+)/m)
      const title = match ? match[1].trim() : name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
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

const themeConfig = {
  nav: [
    { text: '首页', link: '/' },
  ],

  sidebar: buildSidebar(),

  search: {
    provider: 'local',
  },

  socialLinks: [
    { icon: 'github', link: 'https://github.com/Lsl1ent' },
  ],

  docFooter: {
    prev: '上一篇',
    next: '下一篇',
  },

  outline: {
    label: '本页目录',
  },

  lastUpdated: {
    text: '最后更新',
  },
}

export default {
  title: 'My Notes',
  description: '个人学习笔记',
  lang: 'zh-CN',
  cleanUrls: true,

  srcExclude: ['**/drafts/**', '**/_draft*'],

  themeConfig,
}
