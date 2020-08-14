<template>
  <div>
    <div class="welcome container d-flex justify-content-center">
      <div class="">
        <div class="container ">
          <div class="container-fluid col">
            <div class="kanban welcomeButton d-flex justify-content-center">
              <img class="img-responsive " src="../assets/KANBAN.png" alt="KANBAN" >
            </div>
          </div>
          <div class="container col">
            <div class="welcomeButton homelogin d-flex justify-content-center">
              <a @click="toLogin" class="formTitle">
                <img class="homeimg-responsive" src="../assets/login.png" alt="KANBAN">
              </a>
            </div>
          </div>
          <div class="container col">
            <div class="welcomeButton homeregister d-flex justify-content-center">
              <a @click="toRegister" class="formTitle">
                <img class="homeimg-responsive" src="../assets/register.png" alt="REGISTER">
              </a>
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
    toLogin() {
      this.$emit("showLogin");
    },
    toRegister() {
      this.$emit("showRegister");
    },
  },
  created() {
    console.log("WELCOME PAGE MOUNTED!");
  },
};
</script>

<style>
</style>