<template>
  <div :class=" `${name} container col-sm-5 col-md-5 col-lg-4 col-xl ` ">
    <div class="d-flex justify-content-center">
      <div>{{name}}</div>
    </div>
    <div>
      <div class="bodyContent" id="backlogContent">
        <TaskCard
          v-for="task in filteredTask"
          :key="task.id"
          :task="task"
        ></TaskCard>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "./TaskCard"
export default {
  name: "TaskBacklog",
  props: ["unfilteredTask", "name"],
  components: {TaskCard},
  data() {
    return {};
  },
  methods: {
    getTask(id) {
      this.$emit("gettingTask", id);
    },
    deleteTask(id) {
      this.$emit("deletingTask", id);
    },
    updateStatusToProduct(id) {
      const status = {
        status: "product",
        id,
      };
      this.$emit("updateStatusTask", status);
    },
  },
  computed: {
    filteredTask() {
      return this.unfilteredTask.filter(
        (unfilteredTask) => unfilteredTask.status === this.name
      );
    },
    getColor() {
      if (this.name === "backlog") {
        return "bg-primary";
      } else if (this.name === "development") {
        return "bg-warning";
      } else if (this.name === "product") {
        return "bg-secondary";
      } else if (this.name === "done") {
        return "bg-success";
      }
    },
  },
};
</script>

<style scoped>
</style>