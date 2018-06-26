<template>
  <div class="flex flex-center column">
    <h1>Landing Page</h1>
    <br>
    <q-btn color="primary" @click="handleClick">Login</q-btn>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    handleClick () {
      this.$router.push('/signin');
    }
  }
};
</script>

<style scoped>

</style>
