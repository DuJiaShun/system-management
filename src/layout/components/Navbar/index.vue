<template>
  <div class="navbar">
    <hamburger class="hamburger-container" :is-active="appStore.sidebar.opened" @toggleClick="toggleClick" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="appStore.device !== 'mobile'">
        <!-- 模糊搜索 -->
        <search id="header-search" class="right-menu-item" />
        <!-- 全屏 -->
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="userStore.userinfo?.avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <span class="user-name">{{ userStore.userinfo?.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/profile/index">
              <el-dropdown-item>个人设置</el-dropdown-item>
            </router-link>
            <a target="_blank" href="#">
              <el-dropdown-item>项目地址</el-dropdown-item>
            </a>
            <a target="_blank" href="#">
              <el-dropdown-item>项目文档</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Navbar' })
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Search from './Search.vue'
import Screenfull from './Screenfull.vue'
import { useAppStore, useUserStore } from '@/store'
const appStore = useAppStore()
const userStore = useUserStore()
// hamburger button
function toggleClick() {
  appStore.toggleSideBar()
}
// 登出
function logout() {}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 50px;
    line-height: 50px;
    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      // vertical-align: text-bottom;
    }
    .hover-effect {
      cursor: pointer;
      transition: background 0.5s;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
    .avatar-container {
      margin-right: 20px;
      .avatar-wrapper {
        height: 50px;
        display: flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .user-name {
          color: #000;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
