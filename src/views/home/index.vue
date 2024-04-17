<template>
  <div class="home-container" v-loading="loading">
    <div class="edit">
      <div>个人工作台</div>
      <div v-if="isEdit" @click="saveData">保存</div>
      <div v-else @click="editData">编辑</div>
    </div>
    <div class="card-container">
      <card-drag :data="cardList"></card-drag>
      <div v-if="!isEdit"></div>
      <div v-else></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Home' })
const loading = ref(false)
const isEdit = ref(false)
const cardList = reactive([
  {
    positionNum: 1,
    name: '最近访问',
    id: 'RecentlyVisited',
    path: ''
  },
  {
    positionNum: 2,
    name: '业务指令',
    id: 'ToDo',
    path: '/command/workplan'
  },
  {
    positionNum: 3,
    name: '通知公告',
    id: 'Announcement',
    path: '/dxf/infoGather/notice'
  }
])
function saveData() {}
function editData() {}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 16px;
  .edit {
    height: 50px;
    background: #fff;
    line-height: 50px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 0px 9.5px 0.5px rgba(153, 153, 153, 0.5);
    > div:first-child {
      font-weight: bold;
      font-size: 20px;
      letter-spacing: 0.05em;
      color: #363740;
    }
    > div:last-child {
      font-size: 16px;
      letter-spacing: 0.05em;
      color: #109cf1;
      cursor: pointer;
    }
  }
}
</style>
