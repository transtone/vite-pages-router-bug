<template>
  <div class="login-form h-full w-full">
    <a-tabs default-active-key="1" v-model:activeKey="loginType">
      <a-tab-pane key="pwd" tab="账号密码">
        <div>
          <a-form
              name="custom-validation"
              class="login-form"
              ref="formRef"
              :model="formState"
              :rules="rule2Account"
              v-bind="layout"
              @finish="onPWDSubmit"
              @finishFailed="finishPWDFailed"
          >
            <a-form-item has-feedback name="account">
              <a-input v-model:value="formState.account" placeholder="账号">
                <template #prefix>
                  <UserOutlined class="text-[#262626] mr-1" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item has-feedback name="password">
              <a-input v-model:value="formState.password" type="password" placeholder="密码" autocomplete="off">
                <template #prefix>
                  <UnlockOutlined class="text-[#262626] mr-1" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="$router.push('/about')" class="login-form-button" :loading="pwdLoading" html-type="submit">确定</a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-tab-pane>
      <a-tab-pane key="phone" tab="手机短信" force-render>
        <div>
          <a-form name="custom-validation" class="login-form" ref="formRef" :model="formState" :rules="rule2Phone"
                  v-bind="layout" @finish="finishPhone" @finishFailed="finishPhoneFailed">
            <a-form-item has-feedback name="phone">
              <a-input v-model:value="formState.phone" placeholder="手机号">
                <template #prefix>
                  <MobileOutlined class="text-[#262626] mr-1" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item has-feedback name="code">
              <div style="display:flex;">
                <a-input v-model:value="formState.code" placeholder="验证码">
                  <template #prefix>
                    <MessageOutlined class="text-[#262626] cursor-pointer mr-1" />
                  </template>
                </a-input>
                <a-button v-if="showCountDownFlag" class="login-form-send">
                  <a-statistic-countdown :value="dealLine" format="ss" @finish="closeCountDown" />
                  <span style="margin-left:2px; color:#1890FF;">s</span>
                </a-button>
                <a-button v-else class="login-form-send" @click="onSendCode">获取验证码</a-button>
              </div>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" class="login-form-button" :loading="phoneLoading" html-type="submit">确定</a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-tab-pane>
      <!-- <a-tab-pane key="wx" tab="扫一扫登录">
        <div class="wx-pic">
          <div class="top">打开微信扫码登录</div>
          <div class="content"></div>
        </div>
      </a-tab-pane>-->
    </a-tabs>
  </div>
</template>


<script setup>
import { reactive, ref, computed, watch, inject } from 'vue'
import { UserOutlined, UnlockOutlined, MobileOutlined, MessageOutlined } from '@ant-design/icons-vue'

const message = inject('message')

const emit = defineEmits(['login-in'])
const loginType = ref('pwd')
const formRef = ref()
const showCountDownFlag = ref(false)
const phoneLoading = ref(false)
const pwdLoading = ref(false)
const loading = computed(() => {
  return phoneLoading.value || pwdLoading.value
})

const dealLine = ref(Date.now() + 1000 * 60)
const formState = reactive({
  account: '',
  password: '',
  phone: '', //手机号
  code: '', //验证码
})
let validateAccount = async (rule, value) => {
  if (value === '') {
    return Promise.reject('请输入账号')
  } else {
    return Promise.resolve()
  }
}
let validatePass = async (rule, value) => {
  if (value === '') {
    return Promise.reject('请输入密码')
  } else {
    // if (formState.checkPass !== '') {
    //   formRef.value.validateField('checkPass')
    // }
    return Promise.resolve()
  }
}
let validatePhone = async (rule, value) => {
  if (value === '') {
    return Promise.reject('请输入手机号码')
  } else if (!isMobile(value)) {
    return Promise.reject('手机号码错误')
  }
  return Promise.resolve()
}

/** 账号密码验证 */
const rule2Account = {
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: 'change',
    },
  ],
  account: [
    {
      required: true,
      validator: validateAccount,
      trigger: 'change',
    },
  ],
}
/** 电话 验证码 验证 */
const rule2Phone = {
  phone: [
    {
      required: true,
      validator: validatePhone,
      trigger: 'change',
    },
  ],
}
const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
}
/** 打开发送验证码的倒计时 */
const openCountDown = () => {
  showCountDownFlag.value = true
  dealLine.value = Date.now() + 1000 * 60
}
/** 倒计时结束 */
const closeCountDown = () => {
  showCountDownFlag.value = false
}
/** 密码登录-校验成功-登录 */
const onPWDSubmit = () => {
  pwdLoading.value = true
  pwdLoading.value = false
  emit('login-in', formState)
}
/** 密码登录-校验失败-弹框提醒 */
const finishPWDFailed = errors => {
  console.log(errors)
}
/** 验证码登录-校验成功-登录 */
const finishPhone = values => {
  console.log(values, formState)
  phoneLoading.value = true
  phoneLoading.value = false
  emit('login-in', formState)
}
/**  验证码登录-校验失败-弹框提醒 */
const finishPhoneFailed = errors => {
  console.log(errors)
}

/** 字段重置 */
const resetForm = () => {
  formRef.value.resetFields()
}
/** 发送验证码 */
const onSendCode = () => {
  const phoneNo = formState.phone
  console.log(phoneNo)
  if (!isMobile(phoneNo)) {
    message.error('手机号码错误')
    return
  }
  message.success('短信发送成功！')
  openCountDown()
}
</script>

<style lang="less">
.login-form {
  .ant-input-prefix .anticon,
  .ant-btn,
  .ant-input {
    font-size: 14px;
  }

  .ant-statistic-content {
    font-size: 14px;
    line-height: 22px;
    /* 颜色/蓝色/6 */
    color: #1890ff;
  }

  .ant-tabs-bar {
    margin: 0;
  }

  .ant-tabs-nav {
    font-size: 14px;

    .ant-tabs-tab-active {
      color: #1890ff;
      font-weight: 500;
    }
  }

  .login-form {
    width: 100%;

    .ant-row {
      display: block;
      flex-flow: row wrap;
    }

    .ant-input {
      height: 30px;
    }

    .ant-form-item {
      margin-top: 32px;
    }

    .ant-form-explain {
      position: absolute;
    }
  }

  .login-form-button {
    width: 100%;
    /* 颜色/蓝色/6 */
    background: #1890ff;
    border-radius: 4px;
    height: 40px;
  }

  .login-form-send {
    margin-left: 15px;
    height: 38px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wx-pic {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 24px;

    .top {
      /* 14/正常 */

      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      /* identical to box height, or 157% */
      text-align: center;
      /* 颜色/灰色/9 */
      color: #262626;
    }

    .content {
      margin-top: 20px;
      width: 200px;
      height: 200px;
      background: #c4c4c4;
    }
  }
}
</style>
