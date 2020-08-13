<template>
  <div>
    <Welcome
      v-if="position === 'welcome'"
      @showLogin="showLoginForm"
      @showRegister="showRegisterForm"
    ></Welcome>
    <RegisterForm
      v-else-if="position === 'register'"
      @successRegister="registered"
      @failRegister="failedRegister"
      @backWelcome="showWelcome"
    ></RegisterForm>
    <LoginForm
      v-else-if="position === 'login'"
      @successLogin="loggedIn"
      @failLogin="failedLogin"
      @backWelcome="showWelcome"
    ></LoginForm>
  </div>
</template>

<script>
import Welcome from "./Welcome";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default {
  name: "FrontPage",
  data() {
    return {
      position: "welcome",
    };
  },
  methods: {
    showLoginForm() {
      this.position = "login";
    },
    showRegisterForm() {
      this.position = "register";
    },
    showWelcome() {
      this.position = "welcome";
    },
    loggedIn(data) {
      this.$emit("loginSucceeded", data);
    },
    failedLogin(data) {
      this.position = "login"
      this.$emit("loginFailed", data);
    },
    registered(data) {
      this.position = "login"
      this.$emit("registrationSucceeded", data);
    },
    failedRegister(data) {
      this.position = "register"
      this.$emit("registrationFailed", data);
    },
  },
  components: {
    Welcome,
    RegisterForm,
    LoginForm,
  },
  created() {
    console.log("FRONT PAGE MOUNTED");
  },
};
</script>

<style>
</style>