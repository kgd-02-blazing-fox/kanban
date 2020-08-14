<template>
  <div>
    <Headers @userLogout="logout"></Headers>
    <Infos :UserName="UserName" :UserOrganization="UserOrganization"></Infos>
    <TaskBoard
      :allOrganizationTask="allOrganizationTask"
      @newTaskAdded="refreshTask"
      @newTaskFailedAdded="addTaskFail"
      @taskDelete="taskDeletedeSuccess"
      @deleteTaskFail="taskDeleteFail"
      @updateTaskStatus="statusUpdate"
      @updateTaskStatusFailed="updateFailed"
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
    addTaskFail(data) {
      this.$emit("failAddTask", data);
    },
    taskDeletedeSuccess(data) {
      this.$emit("deleteTasksucceeded", data);
    },
    taskDeleteFail(data) {
      this.$emit("deleteTaskFailed", data);
    },
    statusUpdate(data) {
      this.$emit("newTaskStatus", data);
    },
    updateFailed(data){
      this.$emit("updateFailed", data)
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