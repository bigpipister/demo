<template>
  <img 
    :src="currentSrc" 
    :alt="alt"
    :class="imageClass"
    @error="handleError"
    @load="handleLoad"
    v-bind="$attrs"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  fallback: {
    type: String,
    default: 'https://picsum.photos/400/250?random=1'
  },
  alt: {
    type: String,
    default: '圖片'
  },
  class: {
    type: String,
    default: ''
  }
})

const hasError = ref(false)
const isLoading = ref(true)

const currentSrc = computed(() => {
  if (hasError.value) {
    return props.fallback
  }
  return props.src
})

const imageClass = computed(() => {
  const classes = [props.class]
  if (isLoading.value) {
    classes.push('loading')
  }
  if (hasError.value) {
    classes.push('fallback')
  }
  return classes.join(' ')
})

const handleError = () => {
  if (!hasError.value) {
    hasError.value = true
    isLoading.value = false
  }
}

const handleLoad = () => {
  isLoading.value = false
}

// 當 src 變化時重置狀態
watch(() => props.src, () => {
  hasError.value = false
  isLoading.value = true
})
</script>

<style scoped>
img.loading {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

img.fallback {
  filter: grayscale(20%);
  opacity: 0.9;
}

img {
  transition: all 0.3s ease;
}
</style>
