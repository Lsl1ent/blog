<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <HomePage v-if="frontmatter.layout === 'home'" />
  <DefaultTheme.Layout v-else />
</template>
