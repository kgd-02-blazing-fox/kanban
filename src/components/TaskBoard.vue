<template>
  <div>
    <TaskEdit
      v-if="taskBoardPosition === 'TaskEdit' "
      :spesificTaskData="spesificTaskData"
      @cancelAdd="backTaskBoard"
      @succesEditTask="editTaskUpdated"
    ></TaskEdit>
    <TaskNew
      v-if="taskBoardPosition === 'TaskNew' "
      @cancelAdd="backTaskBoard"
      @succesAddTask="taskAdded"
      @failedAddTask="taskFailedToAdd"
    ></TaskNew>
    <div v-if="taskBoardPosition === 'MainBoard' ">
      <div class="addButton container-md">
        <a href="#" @click="addTask">
          <i class="fas fa-plus-square"></i> POST KANBAN!
        </a>
      </div>
      <div class="d-flex justify-content-center">
        <div class="appbody row container-fluid" id="kanbanBody">
          <TaskLists
            v-for="stat in status"
            :key="stat"
            :unfilteredTask="allOrganizationTask"
            :name="stat"
            @gettingTask="getTaskToEdit"
            @deletingTask="deleteTask"
            @updateStatusTask="updateTaskStatus"
          ></TaskLists>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanAPI from "../config/KanbanAPI";
import TaskLists from "./TaskLists";
import TaskNew from "./TaskNew";
import TaskEdit from "./TaskEdit";

export default {
  name: "TaskBoard",
  data() {
    return {
      taskBoardPosition: "MainBoard",
      showAddForm: false,
      spesificTaskData: {},
      status: ["backlog", "development", "product", "done"],
    };
  },
  methods: {
    deleteTask(id) {
      confirm("ARE YOU SURE THIS IS YOUR TASK?");
      if (true) {
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
              alertMsg: "Sorry, It Is Not Yours. Only the owner Allowed to delete the tasks",
            };
            this.$emit("deleteTaskFail", payload);
          });
      }
    },
    getTaskToEdit(id) {
      console.log(id);
      KanbanAPI({
        method: "GET",
        url: `tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.taskBoardPosition = "TaskEdit";
          this.spesificTaskData = data;
          console.log(this.spesificTaskData);
        })
        .catch((err) => {
          const data = {
            alertMsg: `You Only Allowed To Updated Your Task Status!`,
          };
          this.$emit("updateTaskStatusFailed", data);
        });
    },
    editTaskUpdated(data) {
      this.taskBoardPosition = "MainBoard";
      this.$emit("taskContentUpdate", data);
    },
    updateTaskStatus(data) {
      KanbanAPI({
        method: "PUT",
        url: `tasks/status/${data.id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          status: data.newStatus,
        },
      })
        .then((response) => {
          const payload = {
            alertMsg: `Task Status Updated!`,
          };
          this.$emit("updateTaskStatus", payload);
        })
        .catch((err) => {
          const data = {
            alertMsg: `You Only Allowed To Updated Your Task Status!`,
          };
          this.$emit("updateTaskStatusFailed", data);
        });
    },
    addTask() {
      this.taskBoardPosition = "TaskNew";
    },
    backTaskBoard() {
      this.taskBoardPosition = "MainBoard";
    },
    taskAdded(data) {
      this.taskBoardPosition = "MainBoard";
      this.$emit("newTaskAdded", data);
    },
    taskFailedToAdd(data) {
      this.taskBoardPosition = "MainBoard";
      this.$emit("newTaskFailedAdded", data);
    },
  },
  components: {
    TaskLists,
    TaskNew,
    TaskEdit,
  },
  props: ["allOrganizationTask"],
};
</script>

<style>
</style>