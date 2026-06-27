import { execSync } from 'node:child_process'
import { describe, it } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.resolve(PROJECT_DIR, 'docs', '.vitepress', 'dist')
const DRAFT_DIR = path.resolve(PROJECT_DIR, 'docs', 'drafts')
const FRONTEND_DIR = path.resolve(PROJECT_DIR, 'docs', 'frontend')
const BUILD_CMD = 'npx vitepress build docs'
const BUILD_OPTS = { cwd: PROJECT_DIR, encoding: 'utf-8', timeout: 60000 }

function build() {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true })
  }
  execSync(BUILD_CMD, BUILD_OPTS)
}

describe('build', () => {
  it('should build successfully (exit code 0)', () => {
    build()
    assert.ok(fs.existsSync(DIST_DIR), 'dist directory should exist')
    assert.ok(
      fs.existsSync(path.join(DIST_DIR, 'index.html')),
      'index.html should exist'
    )
  })

  it('should exclude draft articles from build output', () => {
    fs.mkdirSync(DRAFT_DIR, { recursive: true })
    fs.writeFileSync(
      path.join(DRAFT_DIR, 'draft-test.md'),
      '# Draft\n\nThis is a draft article.',
      'utf-8'
    )

    build()

    const draftHtml = path.join(DIST_DIR, 'drafts', 'draft-test.html')
    assert.ok(!fs.existsSync(draftHtml), `Draft page should NOT be at ${draftHtml}`)

    fs.rmSync(DRAFT_DIR, { recursive: true })
  })

  it('should include new article in sidebar', () => {
    const testArticle = path.join(FRONTEND_DIR, 'vue-reactive.md')
    fs.writeFileSync(
      testArticle,
      '# Vue Reactive\n\nUnderstanding Vue reactivity system.',
      'utf-8'
    )

    build()

    const articleHtml = path.join(DIST_DIR, 'frontend', 'vue-reactive.html')
    assert.ok(fs.existsSync(articleHtml), `Article HTML should exist at ${articleHtml}`)

    const frontendIndex = path.join(DIST_DIR, 'frontend', 'index.html')
    const html = fs.readFileSync(frontendIndex, 'utf-8')
    const sidebarLinkPattern = /<a[^>]*href="[^"]*vue-reactive[^"]*"[^>]*>/
    assert.ok(
      sidebarLinkPattern.test(html),
      'Sidebar should contain a clickable link (<a> tag) to vue-reactive article'
    )

    fs.unlinkSync(testArticle)
  })
})
