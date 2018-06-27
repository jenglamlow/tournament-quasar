<template>
  <q-page class="q-pa-md">
    <p>{{ tournament.name }}</p>
    <q-btn color="primary" @click="handleClick">Click</q-btn>
    <q-tabs color="primary" align="justify" style="margin-top: 10px;">
      <q-tab default name="mails" slot="title" label="Mails" />
      <q-tab name="alarms" slot="title" label="Alarms" />
      <q-tab name="movies" slot="title" label="Movies" />

      <q-tab-pane name="mails">Emails tab</q-tab-pane>
      <q-tab-pane name="alarms">Alarms tab</q-tab-pane>
      <q-tab-pane name="movies">Movies tab</q-tab-pane>
  </q-tabs>
  </q-page>
</template>

<style>
</style>

<script>
import { db } from '@/firebase';

export default {
  name: 'Tournament',
  data () {
    return {
      tournament: ''
    };
  },
  beforeRouteUpdate (to, from, next) {
    // Rebind when dynamic route change
    this.$bind('tournament', db.collection('tournaments').doc(this.$route.params.id));
    next();
  },
  created () {
    // For the initial bind
    this.$bind('tournament', db.collection('tournaments').doc(this.$route.params.id));
  },
  methods: {
    handleClick () {
      console.log('click');
    }
  }
};
</script>
