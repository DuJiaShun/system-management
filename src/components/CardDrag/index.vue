<template>
  <div
    :style="{
      position: 'relative',
      height: computeTop(data.length) + cardOutsideHeight + 'px',
      width: cardOutsideWidth * colNum + 'px'
    }"
  >
    <div
      class="d_cardBorderBox"
      v-for="item in data"
      :key="item.id"
      :id="item.id"
      :style="{
        width: cardOutsideWidth + 'px',
        height: cardOutsideHeight + 'px'
      }"
    >
      <div
        class="d_cardInsideBox"
        :style="{
          width: cardInsideWidth + 'px',
          height: cardInsideHeight + 'px'
        }"
      >
        <div @mousedown="touchStart($event, item.id)" class="d_topWrapBox">
          <slot name="header" v-bind:item="item">
            <div class="d_topMenuBox">
              <div class="d_menuTitle">{{ item.name }}</div>
            </div>
          </slot>
        </div>
        <component :is="item.componentData" :itemData="item" v-if="item.componentData"></component>
        <slot name="content" v-bind:item="item" v-else>
          <div class="d_emptyContent">卡片暂无内容</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'CardDrag1' })
const props = defineProps({
  data: {
    type: Array,
    default: function () {
      return []
    }
  },
  colNum: {
    type: Number,
    default: 3
  },
  cardOutsideWidth: {
    type: Number,
    default: 590
  },
  cardOutsideHeight: {
    type: Number,
    default: 380
  },
  cardInsideWidth: {
    type: Number,
    default: 560
  },
  cardInsideHeight: {
    type: Number,
    default: 320
  }
})
const emit = defineEmits(['startDrag','swicthPosition', 'finishDrag'])
let mousedownTimer = null

watch(
  props.data,
  () => {
    addCardStyle()
  },
  { immediate: true }
)

function touchStart(event, selectId) {
  if (mousedownTimer) {
    return false
  }
  //若触发了点击事件，则返回一个暴露出一个方法
  emit('startDrag', event, selectId)
  let DectetTimer = null

  let originTop = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop
  let scrolTop = originTop
  //记录鼠标移动的距离
  let moveTop = 0
  let moveLeft = 0
  //起始组件位置
  let OriginObjPosition = {
    left: 0,
    top: 0,
    originNum: -1
  }
  // 起始鼠标信息
  let OriginMousePosition = {
    x: 0,
    y: 0
  }
  // 记录交换位置的号码
  let OldPositon = null
  let NewPositon = null
  // 选中的卡片的dom和数据
  let selectDom = document.getElementById(selectId)
  let selectMenuData = props.data.find(item => {
    return item.id === selectId
  })

  OriginMousePosition.x = event.screenX
  OriginMousePosition.y = event.screenY

  selectDom.classList.add('d_moveBox')

  moveLeft = OriginObjPosition.left = parseInt(selectDom.style.left.slice(0, selectDom.style.left.length - 2))
  moveTop = OriginObjPosition.top = parseInt(selectDom.style.top.slice(0, selectDom.style.top.length - 2))

  document.addEventListener('mousemove', mouseMoveListener)
  document.addEventListener('mouseup', mouseUpListener)
  document.addEventListener('scroll', mouseScroll)

  function mouseMoveListener(event) {
    moveTop = OriginObjPosition.top + (event.screenY - OriginMousePosition.y)
    moveLeft = OriginObjPosition.left + (event.screenX - OriginMousePosition.x)

    document.querySelector('.d_moveBox').style.left = moveLeft + 'px'
    document.querySelector('.d_moveBox').style.top = moveTop + (scrolTop - originTop) + 'px' //这里要加上滚动的高度

    if (!DectetTimer) {
      DectetTimer = setTimeout(() => {
        cardDetect(moveTop + (scrolTop - originTop), moveLeft)
        DectetTimer = null
      }, 200)
    }
  }

  function mouseScroll(event) {
    scrolTop = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop
    document.querySelector('.d_moveBox').style.top = moveTop + scrolTop - originTop + 'px'
  }

  function cardDetect(moveItemTop, moveItemLeft) {
    //计算当前移动卡片，可以覆盖的号码位置
    let newWidthNum = Math.round(moveItemLeft / props.cardOutsideWidth) + 1
    let newHeightNum = Math.round(moveItemTop / props.cardOutsideHeight)

    if (
      newHeightNum > Math.ceil(props.data.length / props.colNum) - 1 ||
      newHeightNum < 0 ||
      newWidthNum <= 0 ||
      newWidthNum > props.colNum
    ) {
      return false
    }

    const newPositionNum = newWidthNum + newHeightNum * props.colNum
    if (newPositionNum !== selectMenuData.positionNum) {
      let newItem = props.data.find(item => {
        return item.positionNum === newPositionNum
      })
      if (newItem) {
        swicthPosition(newItem, selectMenuData)
      }
    }
  }

  function swicthPosition(newItem, originItem) {
    OldPositon = originItem.positionNum
    NewPositon = newItem.positionNum

    emit('swicthPosition', OldPositon, NewPositon, originItem)

    //位置号码从小移动到大
    if (NewPositon > OldPositon) {
      let changeArray = []
      //从小移动到大，那小的号码就会空出来，其余卡片应往前移动一位
      //找出两个号码中间对应的卡片数据
      for (let i = OldPositon + 1; i <= NewPositon; i++) {
        let pushData = props.data.find(item => {
          return item.positionNum === i
        })
        changeArray.push(pushData)
      }

      for (let item of changeArray) {
        item.positionNum = item.positionNum - 1
        document.querySelector('#' + item.id).style.top = computeTop(item.positionNum) + 'px'
        document.querySelector('#' + item.id).style.left = computeLeft(item.positionNum) + 'px'
      }
      originItem.positionNum = NewPositon
    }

    //位置号码从大移动到小
    if (NewPositon < OldPositon) {
      let changeArray = []
      //从大移动到小，那大的号码就会空出来，其余卡片应往后移动一位
      //找出两个号码中间对应的卡片数据
      for (let i = OldPositon - 1; i >= NewPositon; i--) {
        let pushData = props.data.find(item => {
          return item.positionNum === i
        })
        changeArray.push(pushData)
      }

      for (let item of changeArray) {
        item.positionNum = item.positionNum - 1
        document.querySelector('#' + item.id).style.top = computeTop(item.positionNum) + 'px'
        document.querySelector('#' + item.id).style.left = computeLeft(item.positionNum) + 'px'
      }
      originItem.positionNum = NewPositon
    }
  }

  function mouseUpListener() {
    //取消位于交换队列的检测事件、对位置进行最后一次检测
    clearTimeout(DectetTimer)
    DectetTimer = null
    cardDetect(moveTop + (scrolTop - originTop), moveLeft)

    document.querySelector('.d_moveBox').classList.add('d_transition')
    document.querySelector('.d_moveBox').style.top = computeTop(selectMenuData.positionNum) + 'px'
    document.querySelector('.d_moveBox').style.left = computeLeft(selectMenuData.positionNum) + 'px'
    emit('finishDrag', OldPositon, NewPositon, selectMenuData)

    mousedownTimer = setTimeout(() => {
      /*用0.3秒来过渡
            mousedownTimer在一开始对点击事件进行了判断，若还在过渡则不能进行下一次点击
          */
      document.querySelector('.d_moveBox').classList.remove('d_transition')
      document.querySelector('.d_moveBox').classList.remove('d_moveBox')
      clearTimeout(mousedownTimer)
      mousedownTimer = null
    }, 300)

    document.removeEventListener('mousemove', mouseMoveListener)
    document.removeEventListener('mouseup', mouseUpListener)
    document.removeEventListener('scroll', mouseScroll)
  }
}
function computeLeft(num) {
  return ((num - 1) % props.colNum) * props.cardOutsideWidth
}
function computeTop(num) {
  return (Math.ceil(num / props.colNum) - 1) * props.cardOutsideHeight
}
function addCardStyle() {
  nextTick(() => {
    props.data.forEach(item => {
      document.querySelector('#' + item.id).style.top = computeTop(item.positionNum) + 'px'
      document.querySelector('#' + item.id).style.left = computeLeft(item.positionNum) + 'px'
    })
  })
}
</script>
<style scoped>
.d_cardBorderBox {
  user-select: none;
  position: absolute;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.d_cardInsideBox {
  border-radius: 5px;
  box-shadow: 0 0 5px #cacaca;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.d_menuTitle {
  pointer-events: none;
}
.d_topMenuBox {
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #838383;
  background-color: white;
  padding: 0px 15px;
}
.d_moveBox {
  top: 20px;
  left: 20px;
  z-index: 300;
  transition: none;
}
.d_topWrapBox {
  cursor: move;
  border-bottom: 1px solid #e0e0e0;
}
.d_emptyContent {
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #979797;
  display: flex;
  justify-content: center;
  align-items: center;
}
.d_transition {
  transition: all 0.3s;
}
</style>
