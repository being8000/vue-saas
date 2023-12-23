import { appEvents } from "@/core/event-manager";
import { EventKey, EventMap } from "@/core/event-types";
import { onMounted, onUnmounted } from "vue";

export function useSubscribe<K extends EventKey>(
  event: K,
  callback: EventMap[K]
) {
  onMounted(() => appEvents.subscribe(event, callback));
  onUnmounted(() => appEvents.unsubscribe(event, callback));
}
