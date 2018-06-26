<template>
  <q-page class="q-pa-md">
    <p>Teams</p>
    <q-btn
      icon="note add"
      color="secondary"
      class=""
      @click.native="addTeamModal = true"
    >
      Add Team
    </q-btn>

    <!-- Create Team Modal -->
    <q-modal v-model="addTeamModal" :content-css="{padding: '30px', minWidth: '60vw', minHeight: '60vh'}">
      <h5>Add a Team</h5>

      <p class="caption">Team Name</p>
      <q-input
        v-model="form.name"
        :error="$v.form.name.$error || this.isExist"
      >
      </q-input>

      <p class="caption">Category</p>
      <!-- <q-input v-model="form.category" type="text"></q-input> -->
      <q-select
        v-model="form.category"
        :error="$v.form.category.$error"
        :options="categoryOption"
      />

      <div class="absolute-bottom-right" style="padding: 30px">
        <q-btn class="q-ma-xs" color="primary" @click="submitAddTeam">Create</q-btn>
        <q-btn class="q-ma-xs" @click="addTeamModal = false">Cancel</q-btn>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
import { db } from '@/firebase';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Team',
  data () {
    return {
      form: {
        name: '',
        category: ''
      },
      addTeamModal: false,
      isExist: false
    };
  },

  validations: {
    form: {
      name: { required },
      category: { required }
    }
  },

  computed: {
    categoryOption () {
      let options = [];
      for (let i = 0; i < this.categories.length; i++) {
        let categoryItem = {
          value: this.categories[i]['.key'],
          label: this.categories[i]['.key']
        };
        options.push(categoryItem);
      }
      return options;
    }
  },

  firebase: {
    categories: db.ref('categories'),
    team: db.ref('team')
  },

  methods: {
    submitAddTeam () {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify({
          message: 'Please review highlighted fields again.',
          position: 'top'
        });
      } else {
        // Create namekey
        const nameKey = this.form.name.toLowerCase().split(' ').join('_');

        // Check team name existence
        this.$firebaseRefs.team.child(nameKey).once('value', snapshot => {
          if (snapshot.exists()) {
            this.isExist = true;
            this.$q.notify({
              message: 'Team name "' + this.form.name + '" exist. Please choose another',
              position: 'top'
            });
          } else {
            this.isExist = false;
            // Team Data
            const teamData = {
              name: this.form.name,
              category: this.form.category
            };

            // Publish to the database
            this.$firebaseRefs.team.child(nameKey).set(teamData);

            // clear input field once submitted
            this.form.name = '';
            this.form.category = '';
            this.$v.form.$reset();

            // Close Modal
            this.addTeamModal = false;
          }
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
