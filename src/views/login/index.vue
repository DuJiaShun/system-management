<template>
  <div class="login">
    <el-button type="success" @click="handleLogin">登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { login } from '@/api/user'
import { LoginData } from '@/api/user/type'
defineOptions({ name: 'login' })

// 登录
const loginData = ref<LoginData>({
  username: 'admin',
  password: '123456'
})

const handleLogin = async () => {
  try {
    const res = await login(loginData.value)
    console.log(res, 111)
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
