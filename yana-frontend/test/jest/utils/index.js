import * as All from 'quasar';
import { createLocalVue, shallowMount } from 'test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

const { Quasar, cookies } = All;
const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

const mockSsrContext = () => {
  return {
    req: {
      headers: {},
    },
    res: {
      setHeader: () => undefined,
    },
  };
};

export const mountQuasar = (component, options = {}) => {
  const localVue = createLocalVue();
  const app = {};

  localVue.use(Vuex);
  localVue.use(VueRouter);
  localVue.use(Quasar, { components });
  const store = new Vuex.Store({});
  const router = new VueRouter();

  if (options) {
    const ssrContext = options.ssr ? mockSsrContext() : null;

    if (options.cookies) {
      const cookieStorage = ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;
      const cookies = options.cookies;
      Object.keys(cookies).forEach((key) => {
        cookieStorage.set(key, cookies[key]);
      });
    }

    if (options.plugins) {
      options.plugins.forEach((plugin) => {
        plugin({ app, store, router, Vue: localVue, ssrContext });
      });
    }
  }

  // mock vue-i18n
  const $t = () => {};
  const $tc = () => {};
  const $n = () => {};
  const $d = () => {};

  return shallowMount(component, {
    localVue: localVue,
    propsData: options.propsData,
    store,
    router,
    mocks: { $t, $tc, $n, $d },
    // Injections for Components with a QPage root Element
    provide: {
      pageContainer: true,
      layout: {
        header: {},
        right: {},
        footer: {},
        left: {},
      },
    },
  });
};
