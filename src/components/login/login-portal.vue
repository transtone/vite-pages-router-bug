<template>
  <div class="login-portal">
    <div class="text-center relative">
      <div class="absolute left-0 text-center-v-p cursor-pointer" @click="goBack">
        <LeftOutlined />
      </div>
      <span class="platform-name">门户选择</span>
    </div>
    <a-divider class="mt-3 mb-6" />

    <div class="text-center">
      <a-button type="primary" @click="$router.push('/about')">go about</a-button>
    </div>
  </div>
</template>


<script setup>
import { ref, inject, watch, computed } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'

const message = inject('message')
const emit = defineEmits(['back', 'select'])

const loading = ref(false)

const goBack = () => {
  emit('back', {})
}
const onSelect = platItem => {
  const platParams = { portal: platItem.platformCode }
  emit('select', platItem)
}
</script>

<style lang="less">
.login-portal {

  .platform-name {
    font-size: 16px;
    color: #262626;
  }
}
</style>
