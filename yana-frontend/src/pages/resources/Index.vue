<template>
  <q-page padding class="resources-page flex column">
    <h1 class="text-h5 text-center">Resources</h1>

    <div v-for="r in resources" :key="r.id" class="q-mt-md">
      <resource-card :resource="r"></resource-card>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { Notify } from 'quasar';

import { FETCH_RESOURCES } from 'src/store/actions.types';

import ResourceCard from 'components/ResourceCard';

export default {
  name: 'ResourcesPage',
  components: { ResourceCard },
  preFetch({ store }) {
    return store.dispatch(FETCH_RESOURCES).catch((e) => {
      Notify.create({
        type: 'warning',
        message: 'Something went wrong when loading resources - please try again later.',
      });
    });
  },
  computed: {
    ...mapState(['resources']),
  },
};
</script>

<style></style>
