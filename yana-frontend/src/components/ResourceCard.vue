<template>
  <q-card v-ripple tabindex="0" class="cursor-pointer" @click="go()">
    <q-card-section>
      <div class="text-h6">
        <q-icon :name="'eva-' + resource.icon" class="float-right text-primary"></q-icon>
        {{ resource.title }}
      </div>
      <div v-if="resource.subtitle" class="text-subtitle1">{{ resource.subtitle }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <!-- eslint-disable vue/no-v-html -->
      <div class="text-body1" v-html="resource.descriptionHtml"></div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ResourceCard',
  props: {
    resource: {
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
