<template>
  <div class="text-black">
    <SaaSRenderer />
    <button @click="router.push({ path: '/contenteditable' })">跳转</button>
  </div>
</template>

<script setup lang="ts">
import SaaSRenderer from '@/components/SaaS/RendererPannel.vue'
import { defineComponent, getCurrentInstance, h } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
console.log('instance', getCurrentInstance())
const AAA = defineComponent({
  setup(_props, { expose }) {
    expose({
      sayHello() {
        console.log('hello')
      }
    })
    return h('div', 1)
  }
})
console.log(AAA, 'AAA')
</script>
