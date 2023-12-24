<template>
  <component
    :is="$ref.vueComponent?.component"
    v-bind="$ref.attrs"
    :instance="$ref"
    :id="`saas-component-${$ref.uid}`"
    @click.stop.prevent="onClick"
    :class="['saas-item', `L${$ref.level}`, {
      last: $ref.children.length <= 0,
      selected: $ref.selected
    }]"
  >

    <!-- ParentContainer组件拖拽功能 -->
    <template v-if="$ref.level == 1 && instance.children.length > 0">
      <!-- 这里面有个属性key，使用shadowRef之后，如果是数组有时候需要给组件绑定这个Key，否则就算是调用trigerRef也无法触发渲染 -->
      <draggable
        tag="div"
        ref="drag"
        v-model="instance.children"
        v-bind="dragOption"
        @start="drag = true"
        @end="drag = false"
        class="list-group"
        item-key="uid"
        @change="resort"
      >
        <template #item="{ element }">

          <div>
            <!-- 新增上面这个Div是为了解决当前组件替换成自定义组件之后引起的未知错误 -->
            <SComponent :instance="element" />
          </div>
        </template>
      </draggable>
    </template>
    <template v-else>
      <SComponent
        v-for="(item) in $ref.children"
        :key="`${item.uid}+${item.pid}`"
        :instance="item"
      />
    </template>
  </component>
</template>
<script setup lang="ts">
import { saasApp } from '@/core';
import { SComponentProps } from '@/core/components';
import { computed, onBeforeUnmount, onMounted, onUpdated, shallowRef, triggerRef, ref } from 'vue';
import Draggable from 'vuedraggable';
// import { drawer } from '@/core/types/renderBoarders'
const props = defineProps<SComponentProps>()
const instance = props.instance
const dragOption = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  }
})
// Vue功能逻辑代码
const drag = ref()
const $ref = shallowRef(instance)
if (instance.level == 1) {
  instance.onUpdated((com) => {
    $ref.value = com
    if (typeof drag.value?.$forceUpdate == 'function') {
      drag.value?.$forceUpdate()
    }
    triggerRef($ref)
  })
} else {
  instance.onUpdated((com) => {
    $ref.value = com
    triggerRef($ref)
  })

}

const resort = () => {
  instance.children.map((el, index) => {
    el.index = index;
    // 重新绑定父节点
  });
  instance.update()

  // triggerRef($ref)
}

const onClick = () => {
  saasApp.action.toggleSelect(instance)
}
onMounted(() => {
})
onBeforeUnmount(() => {
})
// 组件重新渲染时候出发
onUpdated(() => {

})

</script>