<template>
    <div class="category">
        <div class="category-header">{{ categoryTitle }}</div>
        <div class="category-content">
            <KanbanCard v-for="task in tasks" :key="task.id" :task="task" v-if="categoryTitle === task.category"></KanbanCard>
        </div>
        <div class="category-footer">Add a task</div>              
    </div>
   
</template>

<script>
import KanbanCard from './KanbanCard';
export default {
    name: 'KanbanList',
    data() {
        return {
            
        }
    },
    components: {
      KanbanCard
    },
    props: {
        categoryTitle: String,
        tasks: Array
    }
}
</script>

<style scoped>
.category {
  width: 300px;
  height: calc(100% - 10px - 17px);
}
.category > * {
  background-color: #e2e4e6;
  color: #333;
  padding: 0 10px;
}
.category .category-header {
  line-height: 36px;
  font-size: 16px;
  font-weight: bold;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.category .category-footer {
  line-height: 36px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #888;
}
.category .category-content {
  list-style: none;
  margin: 0;
  max-height: calc(100% - 36px - 36px);
  overflow-y: auto;
}
</style>