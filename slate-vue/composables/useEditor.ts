import { onMounted } from 'vue'
import { createEditorInstance } from '../plugins/slate-plugin'

let instance = createEditorInstance()

const hooks = {}

export function editorCreated(fn: () => void) {}

export function useEditor() {
  return instance
}

export function useEditorStatus() {
  const editor = useEditor()
  onMounted(() => {
    editor._state.__ob__.dep.addSub((this as any)._watcher)
  })
}
