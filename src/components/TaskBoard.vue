<template>
  <div>
    <TaskNew
      v-if="showAddForm"
      @cancelAdd="backTaskBoard"
      @succesAddTask="taskAdded"
      @failedAddTask="taskFailedToAdd"
    ></TaskNew>
    <div v-else>
      <div class="addButton container-md">
        <a href="#" @click="addTask">
          <i class="fas fa-plus-square"></i> POST KANBAN!
        </a>
      </div>
      <div class="d-flex justify-content-center">
        <div class="appbody row container-fluid" id="kanbanBody">
          <TaskBacklog :unfilteredTask="allOrganizationTask"></TaskBacklog>
          <TaskProduct :unfilteredTask="allOrganizationTask"></TaskProduct>
          <TaskDevelopment :unfilteredTask="allOrganizationTask"></TaskDevelopment>
          <TaskDone :unfilteredTask="allOrganizationTask"></TaskDone>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskBacklog from "./TaskBacklog";
import TaskProduct from "./TaskProduct";
import TaskDevelopment from "./TaskDevelopment";
import TaskDone from "./TaskDone";
import TaskNew from "./TaskNew";

export default {
  name: "TaskBoard",
  data() {
    return {
      showAddForm: false,
    };
  },
  methods: {
    addTask() {
      this.showAddForm = true;
    },
    backTaskBoard() {
      this.showAddForm = false;
    },
    taskAdded(data) {
      this.showAddForm = false;
      this.$emit("newTaskAdded", data);
    },
    taskFailedToAdd(data) {
      this.showAddForm = false;
      this.$emit("newTaskFailedAdded", data);
    },
  },
  components: {
    TaskBacklog,
    TaskProduct,
    TaskDevelopment,
    TaskDone,
    TaskNew,
  },
  props: ["allOrganizationTask"],
};
</script>

<style>
</style>