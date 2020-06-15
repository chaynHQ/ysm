<template>
  <q-page padding class="content-item-page flex column">
    <div v-if="resource">
      <q-btn
        :to="{ name: 'resource', params: { slug: resource.slug } }"
        :label="resource.title"
        icon="eva-arrow-back-outline"
        type="a"
        flat
      ></q-btn>
    </div>

    <div v-if="!item" class="q-pa-md">
      Couldn't find the content you were looking for. It may have been removed.
    </div>

    <div v-if="item" class="q-pa-md">
      <div v-if="nextItem || previousItem" class="q-mb-md flex justify-between">
        <div>
          <q-btn
            v-if="previousItem"
            :to="{ name: 'content_item', params: { slug: resource.slug, itemId: previousItem.id } }"
            icon="eva-arrow-ios-back-outline"
            left
            type="a"
            dense
            flat
            label="Previous"
          ></q-btn>
        </div>

        <div>
          <q-btn
            v-if="nextItem"
            :to="{ name: 'content_item', params: { slug: resource.slug, itemId: nextItem.id } }"
            icon-right="eva-arrow-ios-forward-outline"
            right
            type="a"
            dense
            flat
            label="Next"
          ></q-btn>
        </div>
      </div>

      <h1 class="text-h5">
        {{ item.title }}
      </h1>

      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="item.description"
        class="q-mt-md text-body1"
        v-html="richText(item.description)"
      ></div>

      <q-card flat bordered class="q-mt-md">
        <q-card-section>
          <template v-if="item.type === 'external_link'">
            <a :href="item.link" target="_blank" rel="noopener">{{ item.link }}</a>
          </template>

          <template v-if="item.type === 'note'">
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="text-body1 content-item__note-content"
              v-html="richText(item.content)"
            ></div>
          </template>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

import { FETCH_RESOURCE } from 'src/store/actions.types';

import { richTextMixin } from 'src/shared/rich-text-mixin';

export default {
  name: 'ContentItemPage',
  mixins: [richTextMixin],
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
    item() {
      return this.$store.getters.contentItem(this.$route.params.itemId);
    },
    previousItem() {
      return this.$store.getters.previousContentItem(this.$route.params.itemId);
    },
    nextItem() {
      return this.$store.getters.nextContentItem(this.$route.params.itemId);
    },
  },
};
</script>

<style lang="scss">
.content-item {
  &__note-content {
    p {
      margin-bottom: $space-base;
    }
  }
}
</style>
