/* @jsxImportSource vue */
/**
 * A wrapper around the provider to handle `onChange` events, because the $editor
 * is a mutable singleton so it won't ever register as "changed" otherwise.
 */
import {EDITOR_TO_ON_CHANGE} from '../slate-vue-shared';
import  { defineComponent, onBeforeMount, reactive, ref  } from 'vue';
import { VueEditor, getGvm } from '../plugins';
import {fragment} from './fragment'
import { useEditor } from '../composables/useEditor';

interface SlateData {
  name: string | null
}

export const Slate = defineComponent<{
  value: String,
}>({
  name: 'slate',
  // props: {
  //   value: String,
  // },

  setup(props, {emit, slots}){
    const name = ref<String>('')
    const editor = useEditor()
    const genUid =() => {
      return Math.floor(Date.now() * Math.random()).toString(16)
    }
    /**
     * force slate render by change fragment name
     * @param newVal
     */
    const renderSlate =(newVal?: any)  =>{
      const value = newVal || props.value
      editor.children = JSON.parse(value);
      const $$data = JSON.parse(value);
      editor._state= reactive($$data)

      clearEditor();
      name.value = genUid()
    }
    const clearEditor=()  =>{
      editor.selection = null
    }

    EDITOR_TO_ON_CHANGE.set(editor,()=>{
      // patch to update all use
      // update editable manual
      // notify all update
      editor._state.__ob__.dep.notify()
      // update focus manual
      const gvm = getGvm(editor)
      gvm.focused = VueEditor.isFocused(editor)
      let op = editor._operation
      if(op && op.type === 'set_selection') {
        gvm.expose?.updateSelected()
      }
      // emit onchange event
      emit('onChange')
    })

    onBeforeMount(() => {
      renderSlate()
      editor.clear = () => {
        renderSlate(JSON.stringify([
          {
            children: [
              { text: '' },
            ],
          },
        ]))
      }
    })
    return (
      <fragment name={name}>
        {slots.default && slots.default({})}
      </fragment>
    )
  },

})
