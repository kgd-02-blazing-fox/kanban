<template>
  <div>
    <div v-if="alertOn">
      <div class="alert alert-primary" role="alert">{{alertMsg}}</div>
    </div>
    <Dashboard
      v-if="isLogin"
      :allOrganizationTask="organizationTasks"
      :UserName="name"
      :UserOrganization="organization"
      @userLoggedOut="logoutClear"
      @failAddTask="registrationStatus"
      @deleteTaskFailed="registrationStatus"
      @deleteTasksucceeded="newTaskOnList"
      @refreshTasks="newTaskOnList"
      
    ></Dashboard>
    <FrontPage
      v-else
      @loginSucceeded="loginSuccess"
      @loginFailed="registrationStatus"
      @registrationSucceeded="registrationStatus"
      @registrationFailed="registrationStatus"
    ></FrontPage>
  </div>
</template>

<script>
import KanbanAPI from "./config/KanbanAPI";

import FrontPage from "./components/FrontPage";
import Dashboard from "./components/Dashboard";

export default {
  name: "App",
  data() {
    return {
      name: "",
      organization: "",
      alertMsg: "",
      isLogin: false,
      alertOn: false,
      organizationTasks: [],
    };
  },
  methods: {
    fetchOrganizationTask() {
      let count = 0
      KanbanAPI({
        method: "GET",
        url: "tasks",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.organizationTasks = response.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((_) => {
          // console.log("FETCHED");
        });
    },
    loginSuccess(data) {
      this.name = data.name;
      this.organization = data.organization;
      this.alertMsg = data.alertMsg;
      this.isLogin = true;
      this.alertOn = true;
      setTimeout((_) => {
        this.alertOn = false;
        this.alertMsg = "";
      }, 3000);
    },
    newTaskOnList(data) {
      console.log("TESSS");
      this.fetchOrganizationTask();
      this.alertOn = true;
      this.alertMsg = data.alertMsg;
      setTimeout((_) => {
        this.alertOn = false;
        this.alertMsg = "";
      }, 3000);
    },
    registrationStatus(data) {
      this.alertOn = true;
      this.alertMsg = data.alertMsg;
      setTimeout((_) => {
        this.alertOn = false;
        this.alertMsg = "";
      }, 3000);
    },
    logoutClear() {
      this.alertOn = true;
      this.alertMsg = "LOGGED OUT!";
      setTimeout((_) => {
        this.alertOn = false;
        this.alertMsg = "";
      }, 3000);
      this.name = "";
      this.organization = "";
      this.isLogin = false;
    },
  },
  components: {
    FrontPage,
    Dashboard,
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.fetchOrganizationTask();
      this.isLogin = true;
    } else {
      console.log("YOU ARE NOT LOGIN");
    }
  }
};
</script>

<style>
</style>