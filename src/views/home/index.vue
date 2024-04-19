<template>
  <div class="home-container" v-loading="loading">
    <div class="edit">
      <div>个人工作台</div>
      <div v-if="isEdit" @click="saveData">保存</div>
      <div v-else @click="editData">编辑</div>
    </div>
    <div class="card-container">
      <div v-if="!isEdit">
        <my-card-drag :data="cardList" :column-space="40" :row-space="40"></my-card-drag>
      </div>
      <div v-else>
        <card-drag :data="cardList"></card-drag>
      </div>
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
    index: 1,
    name: '最近访问',
    id: 'RecentlyVisited',
    path: ''
  },
  {
    positionNum: 2,
    index: 2,
    name: '业务指令',
    id: 'ToDo',
    path: '/command/workplan'
  },
  {
    positionNum: 3,
    index: 3,
    name: '通知公告',
    id: 'Announcement',
    path: '/dxf/infoGather/notice'
  },
  {
    positionNum: 4,
    index: 4,
    name: '综合评估',
    id: 'ComprehensiveEvaluation',
    path: ''
  },
  {
    positionNum: 5,
    index: 5,
    name: '绩效报表',
    id: 'PerformanceReport',
    path: ''
  },
  {
    positionNum: 6,
    index: 6,
    name: '巡防APP考核质态',
    id: 'QualityAssessment',
    path: ''
  },
  {
    positionNum: 7,
    index: 7,
    name: '警情提示',
    id: 'AlarmWarning',
    path: '/stealModel/caseHighIncidence'
  },
  {
    positionNum: 8,
    index: 8,
    name: '违法犯罪警情',
    id: 'PoliceClassification',
    path: ''
  },
  {
    positionNum: 9,
    index: 9,
    name: '出行治安',
    id: 'TravelSecurity',
    path: ''
  },
  {
    positionNum: 10,
    index: 10,
    name: '公安检查站',
    id: 'Checkpoint',
    path: ''
  },
  { positionNum: 11, index: 11, name: '大型活动', id: 'BigEvent', path: '' },

  {
    positionNum: 12,
    index: 12,
    name: '巡防资源和警力',
    id: 'PatrolResources',
    path: ''
  },
  {
    positionNum: 13,
    index: 13,
    name: '单位排名',
    id: 'Unitranking',
    path: ''
  },
  {
    positionNum: 14,
    index: 14,
    name: '情报收集',
    id: 'Informationreportings',
    path: '/dxf/infoGather/infoData'
  },
  {
    positionNum: 15,
    index: 15,
    name: '资料库',
    id: 'Database',
    path: '/command/databaseManagement'
  },
  {
    positionNum: 16,
    index: 16,
    name: '信息曝光',
    id: 'InformationExposure',
    path: ''
  },
  {
    positionNum: 17,
    index: 17,
    name: '天气预报',
    id: 'WeatherForecast',
    path: ''
  },
  {
    positionNum: 18,
    index: 18,
    name: '意见反馈',
    id: 'Feedback',
    path: '/feedback/index'
  },
  {
    positionNum: 19,
    index: 19,
    name: '勤务报备',
    id: 'DutyReport',
    path: '/police/dutyReport'
  }
])
function saveData() {
  isEdit.value = false
}
function editData() {
  isEdit.value = true
}
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
  .card-container {
    padding-top: 20px;
  }
}
</style>
