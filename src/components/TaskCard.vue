<template>
        <div class="content container-lg-12">
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
          <div class="container-fluid d-flex justify-content-end">
            <a href="#" @click="updateStatusToProduct(task.id)">
              <i class="fas fa-arrow-alt-circle-right"></i>
            </a>
          </div>
        </div>
</template>

<script>
export default {
  name: "TaskCard",
  data() {
    return {};
  },
  props: ["task"],
  method: {},
  computed: {
    
  },
};
</script>

<style>
</style>