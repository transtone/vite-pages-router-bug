<template>
  <div class="login w-screen h-screen flex justify-center items-center">
    <div class="login-content w-880px h-480px flex">
      <div class="w-1/2 bg-[#096dd9] rounded-l-15px px-12px">
        <img class="w-full h-full" src="http://rrimage.oss-cn-beijing.aliyuncs.com/spin/20210709/e45a23713427400cb41c27286c1ca022.png" alt="" />
      </div>
      <div class="w-1/2 bg-white rounded-r-15px px-48px py-70px">
        <div class="flex m-b-18px">
          <a-avatar :size="60" class="bg-color-[#1890FF]">
            <template #icon>
              <Icon size="58" custom="rr-color rr-logo" />
            </template>
          </a-avatar>
          <div class="py-2px px-20px">
            <div class="font-semibold text-24px leading-32px text-[#262626]">XX 管理系统</div>
            <div class="text-sm leading-22px text-[#bfbfbf]">XX management system</div>
          </div>
        </div>
        <loginForm v-if="!showPortalSelect" @login-in="handleShowPortal" />
        <loginPortal v-else @back="showPortalSelect = false" @select="onSelectPlat" />
      </div>
    </div>
    <div class="leading-22px text-[#8c8c8c] absolute bottom-4">
      <div class="text-center space-x-4">
        <span>帮助</span>
        <span>隐私</span>
        <span>条款</span>
      </div>
      <div>Copyright @2019-2021</div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const background = "https://rrimage.oss-cn-beijing.aliyuncs.com/spin/20210721/e91d15021d2a4ae59627043db929cc5e.png"
const loignBg = `url('${background}') no-repeat`
const router = useRouter()

const showPortalSelect = ref(false)


const handleShowPortal = () => {
  showPortalSelect.value = true
}

const onSelectPlat = (platInfo) => {
  router.push({ name: 'about' })
}

</script>

<style lang="less">
.login {
  background: v-bind('loignBg');
  background-size: 100% 100%;
}
</style>
