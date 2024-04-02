<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate'
defineOptions({ name: 'AppLink', inheritAttrs: false })
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const external = computed(() => isExternal(props.to))

const type = computed(() => {
  return external.value ? 'a' : 'router-link'
})

function linkProps(to: string) {
  return external.value ? { href: to, target: '_blank', rel: 'noopener' } : { to }
}
</script>
