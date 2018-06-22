<template>
  <q-page class="flex flex-center">
    <h1>HOME</h1>
    <q-btn color="primary" @click="handleClick">Click</q-btn>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'HomePage',
  methods: {
    handleClick () {
      console.log('click');
    }
  }
};
</script>
