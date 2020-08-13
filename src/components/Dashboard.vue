<template>
  <div>
    <Headers @userLogout="logout"></Headers>
    <Infos :UserName="UserName" :UserOrganization="UserOrganization"></Infos>
    <TaskBoard
      :allOrganizationTask="allOrganizationTask"
      @newTaskAdded="refreshTask"
      @newTaskFailedAdded="addTaskFail"
    ></TaskBoard>
  </div>
</template>

<script>
import Infos from "./Infos";
import Headers from "./Headers";
import TaskBoard from "./TaskBoard";

export default {
  name: "Dashboard",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$emit("userLoggedOut");
    },
    refreshTask(msg) {
      this.$emit("refreshTasks", msg);
    },
    addTaskFail(data){
      this.$emit("failAddTask", data)
    }
  },
  components: {
    Infos,
    Headers,
    TaskBoard,
  },
  props: ["allOrganizationTask", "UserName", "UserOrganization"],
  created() {
    console.log("DASHBOARD!!!");
  },
};
</script>

<style>
</style>