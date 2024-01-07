<template>
  <section class="data-text-block">
    <button @click="click">dd</button>
    <div
      ref="item"
      contenteditable="true"
      @focus="focus"
    >appearance
      <a href="1231">123123123</a>
      appearance
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
const item = ref()
function setCursor(pos) {
  var tag = item.value;

  // Creates range object 
  var setpos = document.createRange();

  // Creates object for selection 
  var set = window.getSelection();
  // Set start position of range 
  // setpos.setStart(tag.childNodes[0], pos);
  // 全选指定节点的内容
  setpos.selectNodeContents(tag)
  // setpos.setEndBefore(tag.nex)
  // Collapse range within its boundary points 
  // Returns boolean 
  setpos.collapse(false);

  // Remove all ranges set 
  set.removeAllRanges();

  // Add range with respect to range object. 
  set.addRange(setpos);

  // Set cursor on focus 
  tag.focus();
}

const focus = () => {
  console.log('focus')
}
const click = () => {
  setCursor()
}
</script>