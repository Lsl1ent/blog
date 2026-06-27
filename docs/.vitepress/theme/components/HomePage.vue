<script setup>
</script>

<template>
  <div class="home">
    <div class="avatar">
      <span>LS</span>
    </div>
    <h1 class="title">My Notes</h1>
    <p class="tagline">记录每个技术脚印 · 持续积累 · 厚积薄发</p>
    <div class="actions">
      <a href="/frontend/" class="btn">开始阅读</a>
    </div>
    <div class="links">
      <a href="https://github.com/Lsl1ent" target="_blank">GitHub</a>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 48px 24px;
  text-align: center;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(59, 130, 246, .25);
}

.avatar span {
  color: #fff;
  font-size: 22px;
  font-weight: 700;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}

.tagline {
  font-size: 14px;
  color: var(--vp-c-text-3);
  margin: 0 0 32px;
}

.actions {
  margin-bottom: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  background: var(--vp-c-brand-1);
  color: #fff;
  transition: opacity .15s;
}

.btn:hover {
  opacity: .85;
}

.links a {
  font-size: 13px;
  color: var(--vp-c-text-3);
  text-decoration: none;
}

.links a:hover {
  color: var(--vp-c-text-2);
}
</style>
