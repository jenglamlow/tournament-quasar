<template>
  <div class="fixed-center text-center">
    <q-card style="width: 500px">
        <q-card-main>
          <h2 class="row justify-center">Wiser Tournament</h2>
          <q-field
            icon='person'
            class="formInput"
          >
            <q-input
              v-model="form.email"
              placeholder="Email Address"
              @keyup.enter="handleLogin"
              :error="$v.form.email.$error"
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
              @keyup.enter="handleLogin"
              :error="$v.form.password.$error"
            />
          </q-field>
          <div style="padding-top: 20px">
            <q-btn
              color="primary"
              class="full-width formButton"
              @click="handleLogin"
              :loading="fetching"
            >
              Login
            </q-btn>
            <q-btn color="secondary" class="full-width formButton" @click="handleSignUp">Sign Up</q-btn>
          </div>
        </q-card-main>
      </q-card>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  data () {
    return {
      form: {
        email: 'a@a.com',
        password: 'Abcd1234!'
      },
      fetching: false
    };
  },
  validations: {
    form: {
      email: { email, required },
      password: { required }
    }
  },
  methods: {
    handleLogin () {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify({
          message: 'Please review fields again.',
          position: 'top'
        });
      } else {
        this.fetching = true;

        this.$auth.signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(() => {
            // this.$router.push({path: '/'});
          })
          .catch((error) => {
            console.log(error);
            this.$q.notify({
              message: 'Incorrect username or password',
              position: 'top'
            });
          })
          .finally(() => {
            this.fetching = false;
          });
      }
    },
    handleSignUp () {

    }
  }
};
</script>

<style scoped>
.formButton{
  margin: 5px
}

.formInput {
  padding-top: 10px
}
</style>
