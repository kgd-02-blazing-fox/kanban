<template>
    <div class="category-task">{{ task.title }}</div>
</template>

<script>
export default {
    name: 'KanbanCard',
    data() {
        return {
        }
    },
    props: {
        task: Object
    }
}
</script>

<style scoped>
.category .category-content .category-task {
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.category .category-content .category-task:not(:last-child) {
  margin-bottom: 10px;
}
</style>