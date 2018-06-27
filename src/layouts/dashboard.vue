<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Wiser
          <div slot="subtitle">Tournament App</div>
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          @click="handleLogout"
          aria-label="Logout"
        >
          <q-icon name="exit_to_app" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Menu</q-list-header>
        <q-item to="/team">
          <q-item-side icon="group" />
          <q-item-main label="Team"/>
        </q-item>
        <q-collapsible icon="event" label="Tournament">
          <q-item v-for="t in tournaments" :key="t['.key']" :to="tournamentUrl(t.id)">
            <q-item-main :label="t.name"/>
          </q-item>
         </q-collapsible>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { auth, db } from '@/firebase';

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      tournaments: []
    };
  },

  firestore: {
    tournaments: db.collection('tournaments')
  },

  methods: {
    tournamentUrl (id) {
      return '/tournament/' + id;
    },

    handleLogout () {
      auth.signOut()
        .then(() => {
          location.reload(); // To refresh vue-router
        }).catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
