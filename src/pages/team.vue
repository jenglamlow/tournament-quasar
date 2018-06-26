<template>
  <q-page class="q-pa-md">
    <p>Teams</p>
    <q-btn
      icon="note add"
      color="secondary"
      class=""
      @click.native="openModal('create')"
    >
      Add Team
    </q-btn>

    <!-- Data Table -->
    <q-table
      :data="teams"
      :columns="columns"
      title="Team List"
      class=""
      color=""
      row-key="name"
      style="margin-top: 30px"
    >
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
      </q-tr>
    </q-table>

    <!-- Modal Page -->
    <q-modal
      v-model="teamModal"
      :content-css="{padding: '30px', minWidth: '60vw', minHeight: '60vh'}"
      @hide="resetForm()"
    >
      <h5 v-if="modalType === 'create'">Add a Team</h5>
      <h5 v-else>Update Team</h5>

      <p class="caption">Team Name</p>
      <q-input
        v-model="form.name"
        :error="$v.form.name.$error"
        @blur="$v.form.name.$touch"
      >
      </q-input>

      <p class="caption">Category</p>
      <q-select
        v-model="form.category"
        :error="$v.form.category.$error"
        :options="categoryOption"
        @blur="$v.form.category.$touch"
      />

      <div class="absolute-bottom-right" style="padding: 30px">
        <q-btn v-if="modalType === 'create'"
          class="q-ma-xs"
          color="primary"
          @click="onSubmit"
        >
          Create
        </q-btn>
        <q-btn v-else
          class="q-ma-xs"
          color="primary"
          @click="onSubmit"
          :disable="!$v.form.$anyDirty"
        >
          Submit
        </q-btn>
        <q-btn class="q-ma-xs" @click="resetForm">Cancel</q-btn>
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

      columns: [
        {
          name: 'teamName',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'category',
          label: 'Category',
          field: 'categoryName',
          sortable: true
        }
      ],
      teams: [],
      categories: [],

      teamModal: false,
      modalType: '',
      selectedId: ''
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
      let options = this.categories
        .reduce((acc, cur) => {
          let obj = {
            value: cur.id + ':' + cur.name,
            label: cur.name
          };
          acc.push(obj);
          return acc;
        }, []);

      return options;
    }
  },

  firestore: {
    categories: db.collection('categories'),
    teams: db.collection('teams')
  },

  methods: {
    openModal (type) {
      this.modalType = type;
      this.teamModal = true;
    },

    resetForm () {
      // clear input field once submitted
      this.form.name = '';
      this.form.category = '';
      this.$v.form.$reset();

      // Close Modal
      this.teamModal = false;
    },

    onSubmit () {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify({
          message: 'Please review highlighted fields again.',
          position: 'top'
        });
      } else {
        // Team Data
        const teamData = {
          name: this.form.name,
          categoryId: this.form.category.split(':')[0],
          categoryName: this.form.category.split(':')[1]
        };

        // Publish to the database
        if (this.modalType === 'create') {
          this.$firestoreRefs.teams.add(teamData);
        } else {
          this.$firestoreRefs.teams.doc(this.selectedId).set(teamData);
        }

        this.resetForm();
      }
    },

    rowClick (row) {
      this.form.name = row.name;
      this.form.category = row.categoryId + ':' + row.categoryName;
      this.selectedId = row.id;
      this.openModal('update');
    }

  }
};
</script>

<style scoped>
</style>
