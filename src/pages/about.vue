<template>
  <div class="about p-5">
    <div class="text-center">
      <div class="text-2xl font-semibold">This is an about page</div>
      <div class="my-3 space-x-3">
        <span v-for="item in res">
          <img class="w-50px h-50px" alt="" :src="item.avatar" />
        </span>
      </div>
    </div>
    <div class="px-3">
      <comAbout />
      <a-button type="primary" @click="goUrl">go back login</a-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const res = [
  { avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' },
  { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' },
  { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png' },
  { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png' },
  { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png' },
  { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png' },
]


const goUrl = () => {
  router.push('/login')
}
</script>
