<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary" centered>
          <v-tabs slot="extension" v-model="tabs" centered color="transparent" slider-color="white">
            <v-tab>Войти</v-tab>
            <v-tab>Зарегистрироваться</v-tab>
          </v-tabs>
        </v-toolbar>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-card-text>
              <v-form v-model="validAut" lazy-validation ref="formAut">
                <!--
                  <v-btn block color="primary" class="white--text" @click="google">
                    <img height="30" width="30" style="background-color: white; margin-right: 5%;" src="~assets/google.svg" /> Войти через Google
                  </v-btn>
                -->
                <v-text-field id="emailLogIn" prepend-icon="mail" name="email" label="Email" type="text" v-model="loginForm.email" :rules="rulesEmail" required></v-text-field>
                <v-text-field id="passwordLogIn" prepend-icon="lock" name="password" label="Password" type="password" v-model="loginForm.password" :rules="rulesPassword" required> </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pa-0"> <v-btn @click="login" block color="primary" class="white--text">Войти</v-btn> </v-card-actions>
          </v-tab-item>
          <v-tab-item>
            <v-card-text>
              <v-form v-model="validCreate" lazy-validation ref="formCreate">
                <!--
                  <v-btn block color="primary" class="white--text" @click="google">
                    <img height="30" width="30" style="background-color: white; margin-right: 5%;" src="~assets/google.svg" /> Зарегистрироваться через Google
                  </v-btn>
                -->
                <v-text-field
                  id="usernameSignUp"
                  prepend-icon="person"
                  name="username"
                  type="text"
                  label="Username"
                  v-model="newAccount.username"
                  :rules="rulesName"
                  :counter="6"
                  required
                ></v-text-field>
                <v-text-field id="emailSignUp" prepend-icon="mail" name="email" label="Email" type="text" v-model="newAccount.email" :rules="rulesEmail" required></v-text-field>
                <v-text-field
                  id="passwordSignUp"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="newAccount.password"
                  :rules="rulesPassword"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pa-0"> <v-btn @click.native="register" block color="primary" class="white--text">Зарегистрироваться</v-btn> </v-card-actions>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      tabs: null,
      loginForm: {
        email: null,
        password: null
      },
      step: 1,
      rulesName: [v => !!v || 'Поле не заполнено', v => (v && v.length >= 6) || 'Должно быть не меньше 6 символов'],
      rulesEmail: [v => !!v || 'Поле не заполнено', v => /.+@.+/.test(v) || 'Неправильно введён email адрес'],
      rulesPassword: [v => !!v || 'Поле не заполнено'],
      validAut: false,
      newAccount: {
        username: null,
        password: null,
        email: null
      },
      validCreate: false
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.post('signup', {
          username: this.newAccount.username,
          email: this.newAccount.email,
          password: this.newAccount.password
        })
        await this.$auth
          .loginWith('local', {
            data: {
              email: this.newAccount.email,
              password: this.newAccount.password
            }
          })
          .then(res => {
            this.$toast.success('Logged In!')
          })
      } catch (e) {
        this.$toast.error('Error', { icon: 'error' })
      }
    },
    // async google() {
    //   try {
    //     this.$toast.show('Logging in...', { icon: 'fingerprint' })
    //     await this.$auth.loginWith('google').catch(e => {
    //       this.$toast.show('Error', { icon: 'fingerprint' })
    //     })
    //     if (this.$auth.loggedIn) {
    //       this.$toast.success('Successfully Logged In', { icon: 'done' })
    //     }
    //   } catch (e) {
    //     this.$toast.error('Username or Password wrong', { icon: 'error' })
    //   }
    // },
    async login() {
      try {
        this.$toast.show('Logging in...', { icon: 'fingerprint' })
        await this.$auth.loginWith('local', {
          data: {
            email: this.loginForm.email,
            password: this.loginForm.password
          }
        }).then( res => {
          this.$toast.success('Logged In!')
        })
        .catch(e => { this.$toast.error('Failed Logging In', { icon: 'error_outline' }) })
      } catch (e) { this.$toast.error('Username or Password wrong', { icon: 'error' }) }
    }
  }
}
</script>

<style scoped>
.v-toolbar__content {
  justify-content: center;
}
</style>
