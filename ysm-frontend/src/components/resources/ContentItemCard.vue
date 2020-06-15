<template>
  <q-card v-ripple flat bordered tabindex="0" class="cursor-pointer" @click="go()">
    <q-card-section>
      <div class="text-subtitle2 text-weight-bold">
        {{ item.title }}
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="item.description"
        class="q-mt-sm text-body2"
        v-html="richText(item.description)"
      ></div>

      <div class="q-mt-sm">
        <template v-if="item.type === 'external_link'">
          <a :href="item.link" target="_blank" rel="noopener" @click.stop="">{{ item.link }}</a>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { richTextMixin } from 'src/shared/rich-text-mixin';

export default {
  name: 'ContentItemCard',
  mixins: [richTextMixin],
  props: {
    resourceSlug: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    go() {
      this.$router.push({
        name: 'content_item',
        params: { slug: this.resourceSlug, itemId: this.item.id },
      });
    },
  },
};
</script>
