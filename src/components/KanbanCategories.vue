<template>
    <div class="col-xl-3 col-l-3 col-md-6 col-sm-12 col-xs-12 py-2">

        <div class="card m-0 kanban-card-border">
            <div class="card-header kanban-card-header bg-transparent kanban-card-border-bottom mh-100">{{category}}</div>
            <div class="card-body kanban-card-content p-0">
                <!-- KANBAN CARDS START/END HERE -->

                <KanbanCards 
                    v-for="task in $_KanbanCategories_filterByCategories"
                    :key="task.id"
                    :category="category"
                    :categories="categories"
                    :id="task.id"
                    :title="task.title"
                    :description="task.description"
                    :user="task.User.name"
                    :createdAt="task.createdAt"
                    @refetchTasks="emitRefetchTasks"
                >
                </KanbanCards>

            </div>
            <div class="card-footer bg-transparent kanban-card-border-top">
                <span class="float-right"><img :src="plusicon" @click.prevent="toggleAdd"></span>
                <form action="" @submit.prevent="$_KanbanCategories_addTask" v-if="formAddStatus">
                    <input id="form-add-title" type="text" v-model="titleAdd" placeholder="Title"> <br>
                    <input type="textarea" v-model="descriptionAdd" placeholder="Description">
                    <button class="float-right button-add"><img src="../assets/confirm.png"></button>
                    <br> <br v-if="!errorMessage">
                    <span id="errorMessage" v-if="errorMessage">{{errorMessage}}</span>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import draggable from "vuedraggable"
import KanbanCards from "../components/KanbanCards.vue"
import axios from "axios"
import plus from "../assets/plus.png"
import cancel from "../assets/cancel.png"

export default {
    name:"KanbanCategories",
    props:["category","tasks","categories"],
    data() {
        return {
            titleAdd:"",
            descriptionAdd:"",
            formAddStatus:false,
            plusicon:plus,
            errorMessage:""
        }
    },
    methods:{
        toggleAdd() {
            this.formAddStatus = !this.formAddStatus
            if (this.formAddStatus) this.plusicon=cancel
            else this.plusicon=plus
        },
        emitRefetchTasks() {
            this.$emit("refetchTasks")
        },
        $_KanbanCategories_addTask() {
            axios({
                method:"POST",
                url:"https://kanban-laurentius-server.herokuapp.com/tasks",
                data:{
                    title:this.titleAdd,
                    description:this.descriptionAdd,
                    category:this.category,
                },
                headers:{
                    "access_token":localStorage.getItem("access_token")
                }
            })
            .then(response=>{
                this.$emit("refetchTasks")
                this.formAddStatus=false
                this.titleAdd=""
                this.descriptionAdd=""
                this.plusicon=plus
            })
            .catch(err=>{
                this.errorMessage = err.response.data.message
                setTimeout(()=>this.errorMessage="",3000)
            })
        }
    },
    computed:{
        $_KanbanCategories_filterByCategories:function() {
            return this.tasks.filter(task=>task.category === this.category)
        }
    },
    components:{
        KanbanCards,
        draggable
    }
}
</script>

<style scoped>
    img {
        width: 30px
    }
    img:hover {
        cursor: pointer;
    }
    .button-add {
        padding: 0;
        border: none;
        background: none;
    }
    #form-add-title {
        margin-bottom:10px
    }
</style>