<template>
  <div>
    <div class="container d-flex justify-content-center mt-5" id="loginBody">
      <div class="container-fluid">
        <div class="col-sm d-flex flex-column">
          <h3 class="formTitle d-flex justify-content-center">login</h3>
        </div>
        <div class="register container d-flex justify-content-center">
          <div class="col-lg">
            <div>
              <form class="form-group" id="loginForm" @submit.prevent="login">
                <br />
                <div>
                  <label for="loginEmail">Email</label>
                  <input
                    class="form-control"
                    type="email"
                    placeholder="your email?"
                    v-model="loginEmail"
                    required
                  />
                  <br />
                </div>
                <div>
                  <label for="loginPassword">Password</label>
                  <input
                    class="form-control"
                    type="password"
                    placeholder="your super secret password"
                    v-model="loginPassword"
                    required
                  />
                  <br />
                </div>
                <div>
                  <button type="submit" class="btn btn-warning">Submit</button>
                  <button @click="backWelcome" class="btn btn-warning">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col mt-3">
          <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanAPI from "../config/KanbanAPI";
import GoogleLogin from "vue-google-login";

export default {
  name: "LoginForm",
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      params: {
        client_id:
          "722681282902-tr36pll0jrmvharg2o98uc64joqhegvs.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  components: { GoogleLogin },
  methods: {
    login() {
      KanbanAPI({
        method: "POST",
        url: "login",
        data: {
          email: this.loginEmail,
          password: this.loginPassword,
        },
      })
        .then((response) => {
          const payload = {
            alertOn: true,
            name: response.data.name,
            organization: response.data.organization,
            alertMsg: `Welcome ${response.data.name} to ${response.data.organization} KANBAN! tasks board!`,
          };
          this.$emit("successLogin", payload);
          localStorage.setItem("access_token", response.data.access_token);
        })
        .catch((err) => {
          const payload = {
            alertMsg: "EMAIL/PASSWORD INVALID",
          };
          this.$emit("failLogin", payload);
        })
        .finally((_) => {
          this.loginEmail = "";
          this.loginPassword = "";
        });
    },
    onSuccess(googleUser) {
      const name = googleUser.Pt.Cd;
      const email = googleUser.Pt.zu;
      KanbanAPI({
        method: "POST",
        url: "googlelogin",
        data: {
          name,
          email,
        },
      })
        .then((response) => {
          const payload = {
            alertOn: true,
            name: response.data.name,
            organization: response.data.organization,
            alertMsg: `Welcome ${response.data.name} to ${response.data.organization} KANBAN! tasks board!`,
          };
          this.$emit("successGoogleLogin", payload);
          localStorage.setItem("access_token", response.data.access_token);
        })
        .catch((err) => {
          const payload = {
            alertMsg: "EMAIL/PASSWORD INVALID",
          };
          this.$emit("failGoogleLogin", payload);
        })
        .finally((_) => {
          this.loginEmail = "";
          this.loginPassword = "";
        });
    },
    backWelcome() {
      this.$emit("backWelcome");
    },
  },
  created() {
    console.log("LOGIN FORM MOUNTED");
  },
};
</script>

<style>
</style>