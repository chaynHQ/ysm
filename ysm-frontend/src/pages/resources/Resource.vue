<template>
  <q-page padding class="resource-page flex column">
    <div v-if="resource" class="q-pa-md">
      <h1 class="text-h5">
        {{ resource.title }}
        <q-icon :name="'eva-' + resource.icon" class="q-ml-sm float-right text-primary"></q-icon>
      </h1>
      <h2 v-if="resource.subtitle" class="text-h6">{{ resource.subtitle }}</h2>

      <div class="q-mt-sm">
        <resource-countries-list
          :countries="resource.countries"
          :mappings="filterOptionsForField('countries')"
        ></resource-countries-list>
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <div class="q-mt-md text-body1" v-html="resource.descriptionHtml"></div>

      <div class="q-py-sm">
        <content-item
          v-for="i in resource.content"
          :key="i.id"
          :item="i"
          class="q-mt-sm"
        ></content-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { Notify } from 'quasar';

import { FETCH_RESOURCE, FETCH_FILTER_OPTIONS } from 'src/store/actions.types';

import ResourceCountriesList from 'components/resources/ResourceCountriesList';
import ContentItem from 'components/resources/ContentItem';

export default {
  name: 'ResourcePage',
  components: { ResourceCountriesList, ContentItem },
  preFetch({ store, currentRoute, redirect }) {
    const fetchFilterOptionsPromise = store.dispatch(FETCH_FILTER_OPTIONS);

    const fetchResourcePromise = store
      .dispatch(FETCH_RESOURCE, currentRoute.params.slug)
      .catch((e) => {
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

    return Promise.all([fetchFilterOptionsPromise, fetchResourcePromise]);
  },
  computed: {
    ...mapState(['resource']),
  },
  methods: {
    filterOptionsForField(field) {
      return this.$store.getters.filterOptionsForField(field);
    },
  },
};
</script>
