<template>
  <section ref="ball" class="mg-ball">
    <button ref="btn" @click="btnToggle">toggle</button>
    <div ref="container" class="b-container">
      <section class="w-max space-x-2 space-y-2 flex">
        <section class=" w-max text-white p-1 bg-orange-600" @click="toggle($event, visible)">Product A</section>
        <section class=" w-max text-white p-1 bg-orange-600" @click="toggle($event, visible)">Product B</section>
        <section class=" w-max text-white p-1 bg-orange-600" @click="toggle($event, visible)">Product C</section>
        <section class=" w-max text-white p-1 bg-orange-600" @click="toggle($event, visible)">Product D</section>
      </section>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref, shallowRef, unref } from 'vue';

const button = {
  width: '60px',
  height: '40px',
}
const container = ref<HTMLElement>()
const ball = ref<HTMLElement>()
const btn = ref<HTMLElement>()
const visible = shallowRef(true)
let _event: MouseEvent = {} as MouseEvent
const toggle = (event: MouseEvent, v: boolean) => {
  const { x, y } = event
  _event = event
  const ballEle = unref(ball)
  const ctnEle = unref(container)
  if (!ctnEle) {
    return
  }
  ballEle?.style.setProperty("--mouse-x", x + 'px');
  ballEle?.style.setProperty("--mouse-y", y + 'px');
  if (!visible.value) {
    ctnEle.style.display = ''
    let st = setTimeout(() => {
      ctnEle.style.clipPath = `circle(200% at ${x}px ${y}px)`
      clearTimeout(st)
    }, 0)
  } else {
    ctnEle.style.clipPath = `circle(40px at ${x}px ${y}px)`
  }
}
const btnToggle = () => {
  const btnEle = unref(btn)
  if (btnEle) {
    btnEle.ontransitionend = () => {
      console.log('btnTrans', visible.value)
      toggle(_event, visible.value)
      btnEle.ontransitionend = null
    }
  }
  btnEle?.classList.remove('fixed')
}
onMounted(() => {
  if (container.value) {
    container.value.ontransitionend = (event: TransitionEvent) => {
      const btnEle = unref(btn)
      const ctnEle = unref(container)
      if (visible.value) {
        ctnEle && (ctnEle.style.display = 'none')
        if (btnEle) {
          btnEle.ontransitionend = () => {
            visible.value = !visible.value
            btnEle.ontransitionend = null
          }
        }
        btnEle?.classList.add('fixed')
      } else {
        visible.value = !visible.value
      }
    }

  }
})
</script>

<style scoped lang="scss">
.mg-ball {
  position: fixed;
  left: 0;
  top: 0;
  --mouse-x: 0px;
  --mouse-y: 0px;

  button {
    font-size: 14px;
    border-radius: 20px;
    border: 1px solid;
    padding: 0;
    margin: 0;
    transform: translate3d(calc(var(--mouse-x) - (v-bind('button.width')/2)), calc(var(--mouse-y) - (v-bind('button.width')/2)), 0);
    width: v-bind('button.width');
    height: v-bind('button.height');
    transition: transform .15s;

    &.fixed {
      transform: translate3d(0, calc(var(--mouse-y) - (v-bind('button.width')/2)), 0);
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      transition: transform .6s cubic-bezier(1, -0.23, .78, .25), border-radius .6s cubic-bezier(1, -0.23, .78, .25);
    }
  }

  .b-container {
    padding: 50px;
    position: fixed;
    left: 0;
    top: 0;
    transform: translate3d();
    width: 100vw;
    height: 100vh;
    background-color: rgb(17, 202, 91);
    clip-path: circle(200% at 0px 0px);
    transition: clip-path .3s;
    will-change: clip-path;
  }
}
</style>