<template>
  <q-card v-ripple tabindex="0" class="cursor-pointer" @click="go()">
    <q-card-section>
      <div class="text-h6">
        <q-icon
          :name="'eva-' + resource.icon"
          class="q-ml-sm q-mt-xs float-right text-primary"
        ></q-icon>
        {{ resource.title }}
      </div>

      <div v-if="resource.subtitle" class="text-subtitle1">{{ resource.subtitle }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <resource-countries-list
        :countries="resource.countries"
        :mappings="countryMappings"
      ></resource-countries-list>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <!-- eslint-disable vue/no-v-html -->
      <div class="text-body1" v-html="richText(resource.description)"></div>
    </q-card-section>
  </q-card>
</template>

<script>
import ResourceCountriesList from './ResourceCountriesList';

import { richTextMixin } from 'src/shared/rich-text-mixin';

export default {
  name: 'ResourceCard',
  components: { ResourceCountriesList },
  mixins: [richTextMixin],
  props: {
    resource: {
      type: Object,
      required: true,
    },
    countryMappings: {
      type: Object,
      required: true,
    },
  },
  methods: {
    go() {
      this.$router.push({ name: 'resource', params: { slug: this.resource.slug } });
    },
  },
};
</script>
