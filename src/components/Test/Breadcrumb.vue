
<template>
  <div class="card flex justify-content-center">
    <Breadcrumb
      :home="home"
      :model="items"
    >
      <template #item="{ item }">
        <a
          class="cursor-pointer"
          :href="item.url"
        >
          <span :class="item.icon"></span>
        </a>
      </template>
      <template #separator> / </template>
    </Breadcrumb>
  </div>
</template>

<script setup>
import Breadcrumb from 'primevue/breadcrumb';
import { ref } from "vue";

const home = ref({ icon: 'pi pi-home' });
const items = ref([{ icon: 'pi pi-sitemap' }, { icon: 'pi pi-book' }, { icon: 'pi pi-wallet' }, { icon: 'pi pi-shopping-bag' }, { icon: 'pi pi-calculator' }]);
</script>
