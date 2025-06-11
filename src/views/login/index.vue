<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <Motion>
            <h2 class="outline-hidden">
              <TypeIt :options="{ strings: 'xiaoye', cursor: false, speed: 100 }" />
            </h2>
          </Motion>

          <el-form v-if="currentPage === 0" ref="ruleFormRef" :mode="ruleForm" :rules="loginRules" size="large">
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    require: true,
                    message: '请输入账号',
                    trigger: 'blur',
                  },
                ]"
                prop="username"
              >
                <el-input
                  v-model="ruleForm.username"
                  clearable
                  placeholder="请输入账号"
                  :prefix-icon="useRenderIcon(User)"
                ></el-input>
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="'password'">
                <el-input
                  v-model="ruleForm.password"
                  clearable
                  show-password
                  placeholder="请输入密码"
                  :prefix-icon="useRenderIcon(Lock)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="200">
              <el-form-item prop="verifyCode">
                <el-input
                  v-model="ruleForm.verifyCode"
                  clearable
                  placeholder="请输入验证码"
                  :prefix-icon="useRenderIcon(Keyhole)"
                >
                  <template v-slot:append>
                    <ImageVerify v-model:code="imgCode"></ImageVerify>
                  </template>
                </el-input>
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-form-item>
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-row class="flex items-center">
                    <el-checkbox v-model="checked">
                      <span class="flex"> 7 天内免登录 </span>
                    </el-checkbox>
                    <el-tooltip
                      content="勾选并登录后，规定的天数内无需用户输入用户名和密码，会自定登录系统"
                      placement="top"
                    >
                      <IconifyIconOffline :icon="Info" class="ml-1" />
                    </el-tooltip>
                  </el-row>

                  <el-button link type="primary" @click="changeCurrentPage(4)"> 忘记密码 </el-button>
                </div>
                <el-button
                  class="w-full mt-4"
                  size="default"
                  type="primary"
                  :loading="loading"
                  :disabled="disabled"
                  @click="onLogin(ruleFormRef)"
                >
                  登录
                </el-button>
              </el-form-item>
            </Motion>

            <Motion :delay="300">
              <el-form-item>
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-button
                    v-for="(item, index) in operates"
                    :key="index"
                    class="w-full mt-4!"
                    size="default"
                    @click="changeCurrentPage(index + 1)"
                  >
                    {{ item.title }}</el-button
                  >
                </div>
              </el-form-item>
            </Motion>
          </el-form>

          <Motion v-if="currentPage === 0" :delay="350">
            <el-form-item>
              <el-divider>
                <p class="text-gray-500 text-xs">第三方登录</p>
              </el-divider>
              <div class="w-full flex justify-evenly">
                <span v-for="(item, index) in thirdParty" :key="index" :title="item.title">
                  <IconifyIconOnline
                    :icon="`ri:${item.icon}-fill`"
                    width="20"
                    class="cursor-pointer text-gray-500 hover:text-blue-400"
                  />
                </span>
              </div>
            </el-form-item>
          </Motion>
          <!-- 第三方登录 -->
        </div>
      </div>
      <!-- 页脚 -->
      <!-- <div class="w-full flex-c absolute bottom-3 text-sm text-[rgba(0,0,0,0.6)] dark:text-[rgba(220,220,242,0.8)]">
        Copyright © 2020-present xiaoye
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw, reactive } from 'vue'
import Motion from '@/utils/motion'
import { loginRules } from './utils/rule'
import TypeIt from '@/components/typeIt/index.tsx'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import type { FormInstance } from 'element-plus'
import { useRenderIcon } from '@/components/icon/hooks'

// 静态图片
import bg from '@/assets/login/bg.png'
import illustration from '@/assets/login/illustration.svg'

import ImageVerify from '@/components/imageVerify/index.vue'

import Lock from '~icons/ri/lock-fill'
import User from '~icons/ri/user-3-fill'
import Info from '~icons/ri/information-line'
import Keyhole from '~icons/ri/shield-keyhole-line'

defineOptions({
  name: 'Login',
})

const imgCode = ref('')
const loading = ref(false)
const checked = ref(false)
const disabled = ref(false)
const ruleFormRef = ref<FormInstance>()
const currentPage = ref(0)

const ruleForm = reactive({
  username: 'admin',
  password: 'admin123',
  verifyCode: '',
})

const changeCurrentPage = (value: number) => {
  currentPage.value = value
}

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm)
    }
  })
}

const immediateDebounce: Function = useDebounceFn((formRef) => onLogin(formRef), 1000)

useEventListener(document, 'keydown', ({ code }) => {
  if (['Enter', 'NumpadEnter'].includes(code) && !disabled.value && !loading.value) immediateDebounce(ruleFormRef.value)
})

const operates = [
  {
    title: '手机登录',
  },
  {
    title: '二维码登录',
  },
  {
    title: '注册',
  },
]

const thirdParty = [
  {
    title: '微信登录',
    icon: 'wechat',
  },
  {
    title: '支付宝登录',
    icon: 'alipay',
  },
  {
    title: 'QQ登录',
    icon: 'qq',
  },
  {
    title: '微博登录',
    icon: 'weibo',
  },
]
</script>

<style scoped>
@import url('@/styles/login.css');
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
