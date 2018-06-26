<template>
  <q-page class="flex flex-center column">
    <h1>Secondary</h1>
    <q-btn color="primary" @click="handleClick">Click</q-btn>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Tournament',
  methods: {
    handleClick () {
      console.log('click');
    }
  }
};
</script>
