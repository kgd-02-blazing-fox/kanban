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
          <TaskBacklog
            v-for="stat in status"
            :key="stat"
            :unfilteredTask="allOrganizationTask"
            :name="stat"
            @gettingTask="getTaskToEdit"
            @deletingTask="deleteTask"
            @updateStatusTask="updateTaskStatus"
          ></TaskBacklog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanAPI from "../config/KanbanAPI";
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
      status: ["backlog", "development", "product", "done"],
    };
  },
  methods: {
    deleteTask(id) {
      KanbanAPI({
        method: "DELETE",
        url: `tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          const payload = {
            alertMsg: "Task Deleted",
          };
          this.$emit("taskDelete", payload);
        })
        .catch((err) => {
          const payload = {
            alertMsg: "Cannot delete task",
          };
          this.$emit("deleteTaskFail", payload);
        });
    },
    getTaskToEdit(id) {
      console.log(id);
    },
    editTaskUpdated(data) {
      console.log(data);
    },
    updateTaskStatus(data) {
      KanbanAPI({
        method: "PUT",
        url: `tasks/status/${data.id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          status: data.status,
        },
      })
        .then((response) => {
          console.log("BISA KE UPDATE DI TASKBOARD");
          const payload = {
            alertMsg: `Task Status Updated!`,
          };
          this.$("updateTaskStatus", payload);
        })
        .catch((err) => {
          const payload = {
            alertMsg: `Failed To Updated Task Status!`,
          };
          this.$("updateFailed", payload);
        });
    },
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