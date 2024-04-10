<template>
  <div class="login-contanier">
    <div class="login-card">
      <div class="title">
        <h2>{{ defaultSettings.title }}</h2>
        <el-tag>{{ version }}</el-tag>
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <svg-icon icon-class="user" />
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            size="large"
          />
        </el-form-item>
        <!-- 密码 -->
        <el-tooltip :visible="isCapslock" content="大写锁定已打开" placement="bottom" effect="light" :offset="5">
          <el-form-item prop="password">
            <svg-icon icon-class="password" />
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
              name="password"
              @keyup="tiggerCapslock"
              @keyup.enter="handleLogin"
              size="large"
              show-password
            />
          </el-form-item>
        </el-tooltip>

        <!-- 登录按钮 -->
        <el-button :loading="btnLoading" type="primary" size="large" class="login-btn" @click.prevent="handleLogin">
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'login' })
import { LoginData } from '@/api/user/type'
import { useUserStore } from '@/store'
import { LocationQueryRaw, LocationQueryValue } from 'vue-router'
import type { FormRules } from 'element-plus'
import defaultSettings from '@/settings'
const version = __APP_VERSION__
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 大写锁定提示
let isCapslock = ref(false)
function tiggerCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState('CapsLock')
  }
}

/**登录 */
const loginForm = reactive<LoginData>({
  username: 'admin',
  password: '123456'
})
const loginRules = reactive<FormRules>({
  username: [{ required: true, trigger: 'blur', message: '请输入正确的用户名' }],
  password: [{ required: true, trigger: 'blur', message: '密码不能小于6位' }]
})
// 登录接口
let btnLoading = ref(false)
let loginFormRef = ref()
function handleLogin() {
  loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      btnLoading.value = true
      try {
        await userStore.login(loginForm)
        const query: LocationQueryRaw = route.query
        const redirect = query.redirect as LocationQueryValue
        const otherQuery = getOtherQuery(query)
        router.push({ path: redirect || '/', query: otherQuery })
      } catch (error) {
        ElNotification.error({
          title: '错误',
          message: '账号或密码错误',
          position: 'bottom-right'
        })
      }
      btnLoading.value = false
    }
  })
}
function getOtherQuery(query: LocationQueryRaw) {
  return Object.keys(query).reduce((acc: any, cur: string) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}
</script>

<style lang="scss" scoped>
@property --rotate {
  syntax: '<angle>';
  initial-value: 120deg;
  inherits: false;
}
@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}
.login-contanier {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-card {
    position: fixed;
    left: calc((100vw - 520px) / 2);
    top: calc((100vh - 400px) / 2);
    background: #fff;
    height: 400px;
    width: 520px;
    position: relative;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &::before {
      content: '';
      width: 528px;
      height: 408px;
      border-radius: 8px;
      background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
      position: absolute;
      z-index: -1;
      top: -4px;
      left: -4px;
      animation: spin 2.5s linear infinite;
    }
    &::after {
      position: absolute;
      content: '';
      top: calc(400px / 6);
      z-index: -1;
      height: 100%;
      width: 100%;
      transform: scale(0.8);
      filter: blur(calc(400px / 6));
      background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
      animation: spin 2.5s linear infinite;
    }
    .title {
      position: relative;
      .el-tag {
        position: absolute;
        z-index: 1;
        top: 12px;
        right: -65px;
      }
    }
    :deep(.login-form) {
      .el-form-item__content {
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        color: #454545;
        flex-wrap: nowrap;
        width: 300px;
        .svg-icon {
          width: 30px;
        }
        .el-input {
          height: 47px;
          .el-input__wrapper {
            box-shadow: none;
          }
        }
      }
      .login-btn {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>
