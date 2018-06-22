<template>
  <div class="fixed-center text-center">
    <q-card style="width: 500px">
      <q-card-main>
        <h2 class="row justify-center">Registration</h2>
          <q-field
            icon='email'
            class="formInput"
          >
            <q-input
              v-model="form.email"
              placeholder="Email Address"
              @keyup.enter="submit"
              :error="$v.form.email.$error"
            />
          </q-field>
          <q-field
            icon='person'
            class="formInput"
          >
          <q-input
            v-model="form.username"
            placeholder="Username"
            @keyup.enter="submit"
            :error="$v.form.username.$error"
          />
          </q-field>
          <q-field
            icon='lock'
            class="formInput"
          >
          <q-input
            v-model="form.password"
            placeholder="Password"
            type="password"
            @keyup.enter="submit"
            :error="$v.form.$error"
          />
          </q-field>
        <div style="padding-top: 20px" class="flex row flex-center">
          <q-btn
            color="primary"
            class="formButton"
            @click="submit"
            :loading="fetching"
          >
            Submit
          </q-btn>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { auth, db } from '@/firebase';

export default {
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      fetching: false
    };
  },
  validations: {
    form: {
      username: { required },
      email: { required, email },
      password: { required }
    }
  },
  firebase: {
    users: db.ref('users')
  },
  methods: {
    submit () {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify({
          message: 'Please review fields again.',
          position: 'top'
        });
      } else {
        // Send sign up to cognito
        this.fetching = true;
        auth.createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(() => {
            // Store username attribute in database
            this.$firebaseRefs.users.push({
              username: this.form.username
            });

            // TODO: uniquenes check
            /*
            app : {
                users: {
                  "some-user-uid": {
                        email: "test@test.com"
                        username: "myname"
                  }
                },
                usernames: {
                    "myname": "some-user-uid"
                }
            }
            */
          })
          .catch((error) => {
            this.$q.notify({
              message: error.message,
              position: 'top'
            });
          })
          .finally(() => {
            this.fetching = false;
          });
      }
    }
  }
};
</script>

<style scoped>
.formButton {
  margin: 5px;
}

.formInput {
  padding-top: 10px;
}
</style>
