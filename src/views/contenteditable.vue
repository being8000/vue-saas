<template>
  <div class="text-black" contenteditable="true" @click="onclick">
    <!-- <ContentList class=" w-2xl m-auto" /> -->

    12312313
  </div>
</template>

<script setup lang="ts">
import { createEditor, Editor, Element, Range, Transforms } from 'slate'
// import ContentList from '@/components/ContentList.vue';
// const link = {
//   type: 'link',
//   url: 'https://example.com',
//   children: [...]
// }

// const editor = {
//   children: [
//     {
//       type: 'paragraph',
//       children: [
//         {
//           text: 'A line of text!',
//         },
//       ],
//     },
//   ],
//   // ...the editor has other properties too.
// }
const editor = createEditor()

// const newTextNode = { text: 'Hello, Slate.js!' };
Transforms.insertText(editor, 'Hello, Slate.js!')
// const onclick = (event: any) => {
//   const node = VueEditor.toSlateNode(editor, event.target)
//   const path = VueEditor.findPath(editor, node)
//   const start = Editor.start(editor, path)

//   if (Editor.void(editor, { at: start })) {
//     const range = Editor.range(editor, start)
//     Transforms.select(editor, range)
//   }
// }
Editor.listen(editor, 'keydown', event => {
  if (event.key === 'Enter') {
    console.log('Enter key pressed!')
  }
})
</script>
