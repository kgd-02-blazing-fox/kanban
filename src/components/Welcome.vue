<template>
  <div>
    <div class="welcome container m-5">
      <div class="d-flex justify-content-between">
        <div class="container">
          <img class="img-responsive" src="../assets/home.svg" alt="WELCOME" width="800px" />
        </div>
        <div class="container col m-3 p-1">
          <div class="container-fluid col mt-5">
            <div class="kanban welcomeButton h-50 w-75">
              <a>KANBAN!</a>
            </div>
          </div>
          <div class="container col">
            <div class="welcomeButton homelogin">
              <a @click="toLogin" class="formTitle">LOGIN</a>
            </div>
          </div>
          <div class="container col">
            <div class="welcomeButton homeregister">
              <a @click="toRegister" class="formTitle">REGISTER</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {};
  },
  methods: {
    toLogin(){
      this.$emit("showLogin")
    },
    toRegister(){
      this.$emit("showRegister")
    }
  },
  created() {
    console.log("WELCOME PAGE MOUNTED!");
  },
};
</script>

<style>
</style>