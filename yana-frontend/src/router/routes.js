const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/Index.vue'),
      },
      {
        path: 'resources',
        name: 'resources',
        component: () => import('pages/resources/Index.vue'),
      },
      {
        path: 'resources/:slug',
        name: 'resource',
        component: () => import('pages/resources/Resource.vue'),
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
