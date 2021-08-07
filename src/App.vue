<template>
  <div class="app">
    <a-config-provider :locale="zhCN">
      <router-view #="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </a-config-provider>
  </div>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'

</script>

<style lang="less">
@import 'assets/style/normal.less';

.app {
  min-height: 100vh;
  background-color: #F0F2F5; // f5f5f5

  #nav {
    text-align: center;
    padding: 30px;
    color: #2c3e50;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .is-fullscreen {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;

    &.spin-fix {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9999;
      background-color: rgba(255, 255, 255, 0.9);
    }

    .sk-loading {
      position: relative;
      width: 40px;
      height: 40px;

      .sk-circle-fade-dot:before {
        content: '';
        display: block;
        margin: 0 auto;
        width: 15%;
        height: 15%;
        background-color: #0078d4;
        border-radius: 100%;
      }
    }
  }

  img {
    display: inherit;
    vertical-align: inherit;
  }

}
</style>

