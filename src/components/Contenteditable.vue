<template>
  <section class="data-text-block">
    <button @click="click">dd</button>
    {{ list }}
    <div
      ref="item"
      style="min-height: 100px; border: 1px solid"
      contenteditable="true"
      @focus="focus"
      @blur="blur"
    >
      <div v-for="(item, key) in list" style="color: red" :key="key">
        <span style="color: rgb(42, 71, 165)">12312asdasdas</span>
        <br />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { ShortcutEvent } from "@/core/ShortcutEvent";
const list = ref([1]);
const shortcut = new ShortcutEvent();
shortcut.addEvent("Enter", async (e) => {
  console.log(e);
  list.value.push(1);
  await setCursor();
});
const item = ref();

function setCursor(pos) {
  var tag = item.value;

  // Creates range object
  var setpos = document.createRange();

  // Creates object for selection
  var set = window.getSelection();
  // Set start position of range
  // setpos.setStart(tag.childNodes[0], pos);
  // 全选指定节点的内容
  setpos.selectNodeContents(tag);
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
document.addEventListener("click", function (event) {
  var range;

  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  } else if (document.caretPositionFromPoint) {
    var pos = document.caretPositionFromPoint(event.clientX, event.clientY);

    if (pos) {
      range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.collapse(true);
    }
  }

  if (range) {
    var textBeforeCaret = range.startContainer.textContent.substring(
      0,
      range.startOffset
    );
    var textAfterCaret = range.startContainer.textContent.substring(
      range.startOffset
    );
    console.log("光标前面的内容:", textBeforeCaret);
    console.log("光标后面的内容:", textAfterCaret);
  }
});

const focus = () => {
  shortcut.enable();
};
const blur = () => {
  shortcut.disable();
};
const click = () => {
  setCursor();
};
</script>
