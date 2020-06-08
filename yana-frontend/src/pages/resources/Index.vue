<template>
  <q-page padding class="resources-page flex column">
    <h1 class="text-h5 text-center">Resources</h1>

    <div v-if="filterOptions" class="q-mt-md q-px-md">
      <div v-for="fos in filterOptions" :key="fos.field">
        <p class="text-overline text-uppercase">
          {{ fos.title }}
        </p>

        <q-chip
          v-for="(o, k) in fos.options"
          :key="k"
          color="secondary"
          :text-color="filterIsActive(fos.field, k) ? 'white' : undefined"
          :outline="!filterIsActive(fos.field, k)"
          class="q-mr-sm"
          clickable
          @click="
            filterIsActive(fos.field, k) ? unapplyFilter(fos.field, k) : applyFilter(fos.field, k)
          "
        >
          {{ o }}
        </q-chip>
      </div>

      <div v-if="hasAnyFilters" class="text-right">
        <q-btn color="primary" flat size="md" @click="clearAllFilters()">
          Clear all filters
        </q-btn>
      </div>
    </div>

    <div v-for="r in resources" :key="r.id" class="q-mt-md">
      <resource-card
        :resource="r"
        :country-mappings="filterOptionsForField('countries')"
      ></resource-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { Notify } from 'quasar';

import {
  FETCH_RESOURCES,
  FETCH_FILTER_OPTIONS,
  APPLY_FILTER,
  UNAPPLY_FILTER,
  CLEAR_ALL_FILTERS,
} from 'src/store/actions.types';

import ResourceCard from 'components/resources/ResourceCard';

export default {
  name: 'ResourcesPage',
  components: { ResourceCard },
  preFetch({ store }) {
    const fetchFilterOptionsPromise = store.dispatch(FETCH_FILTER_OPTIONS);

    const fetchResourcesPromise = store.dispatch(FETCH_RESOURCES).catch((e) => {
      Notify.create({
        type: 'warning',
        message: 'Something went wrong when loading resources - please try again later.',
      });
    });

    return Promise.all([fetchFilterOptionsPromise, fetchResourcesPromise]);
  },
  computed: {
    ...mapState(['filterOptions', 'filters', 'resources']),
    ...mapGetters(['hasAnyFilters']),
  },
  methods: {
    filterOptionsForField(field) {
      return this.$store.getters.filterOptionsForField(field);
    },
    filterIsActive(field, value) {
      return this.$store.getters.filterIsActive(field, value);
    },
    applyFilter(field, value) {
      this.$q.loadingBar.start();
      return this.$store.dispatch(APPLY_FILTER, { field, value }).finally(() => {
        this.$q.loadingBar.stop();
      });
    },
    unapplyFilter(field, value) {
      this.$q.loadingBar.start();
      return this.$store.dispatch(UNAPPLY_FILTER, { field, value }).finally(() => {
        this.$q.loadingBar.stop();
      });
    },
    clearAllFilters() {
      this.$q.loadingBar.start();
      return this.$store.dispatch(CLEAR_ALL_FILTERS).finally(() => {
        this.$q.loadingBar.stop();
      });
    },
  },
};
</script>

<style></style>
