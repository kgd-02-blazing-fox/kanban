<template>
  <div class="content container-lg-12">
    <div class="user container-fluid d-flex justify-content-between">
      {{task.user}}
      <div>
        <a v-if=" name !== 'done' " href="#" @click="getTask(task.id)">
          <i class="fas fa-pen-square"></i>
        </a>
        <a href="#" @click="deleteTask(task.id)">
          <i v-if=" name !== 'done' " class="fas fa-trash-alt"></i>
          <i v-else class="fas fa-check-square"></i>
        </a>
      </div>
    </div>
    <div class="maincontent container-fluid">{{task.content}}</div>
    <div class="container-fluid d-flex justify-content-between">
      <div>
        <a
          v-if=" name === 'product' || name === 'development' "
          href="#"
          @click="updateStatusToLeft(task.id, task.status)"
        >
          <i class="fas fa-caret-square-left"></i>
        </a>
      </div>
      <div>
        <a href="#" v-if=" name !== 'done' " @click="updateStatusToRight(task.id, task.status)">
          <i class="fas fa-caret-square-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  data() {
    return {};
  },
  props: ["task", "name"],
  methods: {
    getTask(id) {
      this.$emit("gettingTask", id);
    },
    deleteTask(id) {
      confirm("ARE YOU SURE")
      if(true){
        this.$emit("deletingTask", id);
      }
    },
    updateStatusToLeft(id, status) {
      let newStatus;
      if (status === "development") {
        newStatus = "backlog";
      } else if (status === "product") {
        newStatus = "development";
      }
      const payload = {
        id,
        newStatus,
      };
      this.$emit("updateStatusTask", payload);
    },
    updateStatusToRight(id, status) {
      let newStatus;
      if (status === "backlog") {
        newStatus = "development";
      } else if (status === "development") {
        newStatus = "product";
      } else if (status === "product") {
        newStatus = "done";
      }
      const payload = {
        id,
        newStatus,
      };
      this.$emit("updateStatusTask", payload);
    },
  },
  computed: {},
};
</script>

<style>
</style>