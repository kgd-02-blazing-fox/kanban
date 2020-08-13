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
      taskDone: this.unfilteredTask,
    };
  },
  methods:{
    getTask(id){

    },
    deleteTask(id){

    }
  },
  computed: {
    filteredTask() {
      return this.taskDone.filter(taskDone => taskDone.status.includes("done"));
    },
  },
};
</script>

<style>
</style>