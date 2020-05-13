<template>
  <div class="app-container position-relative" :style="style">
    <q-layout view="hHh lpR fFf" class="app-container__layout shadow-3" container>
      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer class="bg-primary text-white">
        <q-toolbar> </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  computed: {
    style() {
      return {
        height: this.$q.screen.height + 'px',
      };
    },
  },
};
</script>

<style lang="scss">
.app-container {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  &__layout {
    margin: 0 auto;
    z-index: 4000;
    height: 100%;
    width: 90%;
    max-width: 800px;
    border-radius: 5px;
  }
}

@media (max-width: 800px) {
  .app-container {
    padding: 0;
    &__layout {
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>
