<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle2 text-weight-bold">
        {{ item.title }}
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="item.descriptionHtml"
        class="q-mt-sm text-body2"
        v-html="item.descriptionHtml"
      ></div>

      <div class="q-mt-sm">
        <template v-if="item.type === 'external_link'">
          <a :href="item.link" target="_blank" rel="noopener">{{ item.link }}</a>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ContentItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
