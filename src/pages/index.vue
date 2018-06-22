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
      this.$auth.signInWithEmailAndPassword('a@a.com', 'Abcd1234')
        .then(user => console.log(user))
        .catch(err => console.log('diu', err));
    }
  }
};
</script>
