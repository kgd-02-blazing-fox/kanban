<template>
  <div class="done container col-sm-5 col-md-5 col-lg-4 col-xl">
    <div class="d-flex justify-content-center">DONE</div>
    <div class="bodyContent" id="doneContent">
      <div class="content container-lg-12" v-for="task in filteredTask" :key="task.id">
        <div class="user container-fluid d-flex justify-content-between">
          {{task.user}}
          <div>
            <a href="#" @click="deleteTask(task.id)">
              <i class="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
        <div class="maincontent container-fluid">{{task.content}}</div>
        <div class="container-fluid d-flex justify-content-end">
          <a href="#">
            <i class="fas fa-check-circle"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskDone",
  props: ["unfilteredTask"],
  data() {
    return {

    };
  },
  methods:{
    getTask(id) {
      this.$emit("gettingTask", id);
    },
    deleteTask(id) {
      this.$emit("deletingTask", id);
    },
  },
  computed: {
    filteredTask() {
      return this.unfilteredTask.filter(unfilteredTask => unfilteredTask.status === "done");
    },
  },
};
</script>

<style>
</style>