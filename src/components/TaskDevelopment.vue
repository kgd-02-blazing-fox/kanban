<template>
  <div class="development container col-sm-5 col-md-5 col-lg-4 col-xl">
    <div class="d-flex justify-content-center">DEVELOPMENT</div>
    <div class="bodyContent" id="developmentContent">
      <div class="content container-lg-12" v-for="task in filteredTask" :key="task.id">
        <div class="user container-fluid d-flex justify-content-between">
          {{task.user}}
          <div>
            <a href="#" @click="getTask(task.id)">
              <i class="fas fa-pen-square"></i>
            </a>
            <a href="#" @click="deleteTask(task.id)">
              <i class="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
        <div class="maincontent container-fluid">{{task.content}}</div>
        <div class="container-fluid d-flex justify-content-between">
          <a href="#">
            <i class="fas fa-arrow-circle-left"></i>
          </a>
          <a href="#">
            <i class="fas fa-arrow-alt-circle-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskDevelopment",
  props: ["unfilteredTask"],
  data() {
    return {
      taskDevelopment: this.unfilteredTask,
    };
  },
  methods: {
    getTask(id) {
      this.$emit("gettingTask", id);
    },
    deleteTask(id) {
      this.$emit("deletingTask", id);
    },
  },
  computed: {
    filteredTask() {
      return this.taskDevelopment.filter((taskDevelopment) =>
        taskDevelopment.status.includes("development")
      );
    },
  },
};
</script>

<style>
</style>