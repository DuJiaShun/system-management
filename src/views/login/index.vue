<template>
  <div class="login">
    <el-button type="warning" @click="handleLogin">登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { LoginData } from '@/api/user/type'
import { useUserStore } from '@/store'
defineOptions({ name: 'login' })

const userStore = useUserStore()

// 登录
const loginData = ref<LoginData>({
  username: 'admin',
  password: '123456'
})

const handleLogin = async () => {
  try {
    await userStore.login(loginData.value)
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
