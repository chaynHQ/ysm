<template>
  <div>
    <q-icon name="eva-pin-outline" color="secondary" size="sm" class="q-mr-xs"></q-icon>
    <q-chip v-for="c in countries" :key="c" color="secondary" outline class="q-mr-sm">
      {{ mappings[c] || c }}
    </q-chip>
  </div>
</template>

<script>
export default {
  name: 'ResourceCountriesList',
  props: {
    countries: {
      type: Array,
      required: true,
    },
    mappings: {
      type: Object,
      required: true,
    },
  },
};
</script>
