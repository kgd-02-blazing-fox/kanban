<template>
  <div class="header container-fluid">
    <div class="nav row d-flex justify-content-between">
      <div>
        <img class="m-1" src="../assets/kanban.png" width="150px" />
      </div>
      <div id="logout">
        <button class="btn" @click="logout">logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Headers",
  data(){
    return{}
  },
  methods:{
    logout(){
      localStorage.removeItem("access_token");
      localStorage.removeItem("name"),
      localStorage.removeItem("organization"),
      this.$emit("userLogout")
    }
  }
};
</script>

<style>
</style>