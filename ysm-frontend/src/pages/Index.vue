<template>
  <q-page class="landing-page flex column content-center q-px-lg">
    <div class="flex flex-center">
      <img alt="YSM logo" src="~assets/logo.png" height="100px" class="q-mt-lg" />
    </div>

    <p class="q-mt-lg q-px-lg text-h6 text-center">
      If you’ve been treated in a way that has made you feel uncomfortable or violated, use YSM to
      find out how to get support.
    </p>

    <p class="q-mt-md q-px-lg text-h6 text-center">
      Let YSM be your companion because You Are Not Alone.
    </p>

    <div class="q-mt-lg q-px-md flex column content-center">
      <q-btn outline color="primary" padding="sm xl">
        Are you in immediate distress or danger?
      </q-btn>

      <q-btn to="/resources" unelevated color="primary" class="q-mt-lg q-mx-md" padding="sm">
        Start your journey
      </q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>
