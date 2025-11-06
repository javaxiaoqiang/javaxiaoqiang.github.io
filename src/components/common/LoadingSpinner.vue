<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium' // small, medium, large
  },
  color: {
    type: String,
    default: '#1890ff'
  }
})
</script>

<template>
  <div class="loading-spinner" :class="size">
    <div class="spinner" :style="{ borderTopColor: color }"></div>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #1890ff;
  animation: spin 1s ease-in-out infinite;
}

.small .spinner {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.medium .spinner {
  width: 30px;
  height: 30px;
  border-width: 3px;
}

.large .spinner {
  width: 50px;
  height: 50px;
  border-width: 4px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>