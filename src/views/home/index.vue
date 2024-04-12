<template>
  <div class="home-container" v-loading="loading">
    <div class="edit">
      <div>个人工作台</div>
      <div v-if="isEdit" @click="saveData">保存</div>
      <div v-else @click="editData">编辑</div>
    </div>
    <div class="card-container">
      
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Home' })
const loading = ref(false)
const isEdit = ref(false)
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
