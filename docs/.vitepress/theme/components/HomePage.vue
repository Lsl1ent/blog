<script setup>
const categories = [
  { name: '前端', desc: 'Vue · React · TypeScript · CSS', link: '/frontend/', icon: '🖥' },
  { name: '后端', desc: 'Spring Boot · Node.js · API', link: '/backend/', icon: '⚙' },
  { name: '数据库', desc: 'MySQL · Redis · MongoDB', link: '/database/', icon: '🗄' },
  { name: 'DevOps', desc: 'Docker · CI/CD · Linux', link: '/devops/', icon: '🚀' },
  { name: '杂项', desc: '工具 · 效率 · 踩坑记录', link: '/misc/', icon: '📦' },
]
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="avatar">
        <div class="avatar-placeholder">
          <span>LS</span>
        </div>
      </div>
      <h1 class="site-title">My Notes</h1>
      <p class="subtitle">个人学习笔记</p>
      <p class="tagline">记录每个技术脚印 · 持续积累 · 厚积薄发</p>
      <div class="actions">
        <a href="/frontend/" class="btn-primary">开始浏览</a>
        <a href="https://github.com/Lsl1ent" class="btn-secondary" target="_blank">GitHub</a>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories">
      <h2 class="section-title">分类导航</h2>
      <div class="category-grid">
        <a
          v-for="cat in categories"
          :key="cat.name"
          :href="cat.link"
          class="category-card"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.name }}</span>
          <span class="cat-desc">{{ cat.desc }}</span>
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <p>Powered by VitePress · 2026</p>
    </footer>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--vp-c-bg);
  font-family: var(--vp-font-family-base);
}

/* ---- Hero ---- */
.hero {
  text-align: center;
  padding: 100px 24px 60px;
  max-width: 640px;
}

.avatar {
  margin-bottom: 28px;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(59, 130, 246, .3);
}

.avatar-placeholder span {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
}

.site-title {
  font-size: 44px;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 60%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 8px;
}

.subtitle {
  font-size: 22px;
  color: var(--vp-c-text-1);
  margin: 0 0 4px;
  font-weight: 500;
}

.tagline {
  font-size: 15px;
  color: var(--vp-c-text-3);
  margin: 0;
}

.actions {
  margin-top: 36px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 28px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: all .2s;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: #fff;
  border: none;
}

.btn-primary:hover {
  opacity: .9;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, .3);
}

.btn-secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-secondary:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

/* ---- Categories ---- */
.categories {
  max-width: 720px;
  width: 100%;
  padding: 0 24px 60px;
}

.section-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: all .2s;
}

.category-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.cat-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.cat-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-align: center;
  line-height: 1.5;
}

/* ---- Footer ---- */
.site-footer {
  text-align: center;
  padding: 24px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

/* ---- Responsive ---- */
@media (max-width: 480px) {
  .hero {
    padding-top: 60px;
  }
  .site-title {
    font-size: 32px;
  }
  .subtitle {
    font-size: 18px;
  }
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
