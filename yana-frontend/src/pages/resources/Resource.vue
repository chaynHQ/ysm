<template>
  <q-page padding class="resource-page flex column">
    <div v-if="resource" class="q-pa-md">
      <h1 class="text-h5">
        {{ resource.title }}
        <q-icon :name="'eva-' + resource.icon" class="q-ml-sm text-primary"></q-icon>
      </h1>
      <h2 v-if="resource.subtitle" class="text-h6">{{ resource.subtitle }}</h2>

      <!-- eslint-disable vue/no-v-html -->
      <div class="q-mt-md text-body1" v-html="resource.descriptionHtml"></div>

      <q-card v-for="c in resource.content" :key="c.id" flat bordered class="q-mt-md">
        <template v-if="c.type === 'external_link'">
          <q-card-section>
            <!-- eslint-disable vue/no-v-html -->
            <div v-if="c.descriptionHtml" class="text-body1" v-html="c.descriptionHtml"></div>
            <a :href="c.link" target="_blank" rel="noopener">{{ c.title }}</a>
          </q-card-section>
        </template>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { Notify } from 'quasar';

import { FETCH_RESOURCE } from 'src/store/actions.types';

export default {
  name: 'ResourcePage',
  preFetch({ store, currentRoute, redirect }) {
    return store.dispatch(FETCH_RESOURCE, currentRoute.params.slug).catch((e) => {
      if (e.response?.status === 404) {
        Notify.create({
          type: 'warning',
          message: 'Resource could not be found.',
        });
        redirect('/');
      } else {
        Notify.create({
          type: 'warning',
          message: 'Something went wrong when loading this resource - please try again later.',
        });
      }
    });
  },
  computed: {
    ...mapState(['resource']),
  },
};
</script>
