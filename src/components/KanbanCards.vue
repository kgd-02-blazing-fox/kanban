<template>
    <div class="container-fluid kanban-card-elements my-3 mx-1 py-3">
        <div v-if="!formEditStatus">
            <h5 class="card-title title">{{title}}</h5>
                <p class="card-text desc">{{description}} </p> <br>
                <p class="card-text info">Created by: {{user}} <span id="kanban-date">{{$_KanbanCards_refineDate}}</span></p>
        </div>
            
            <form action="" @submit.prevent="$_KanbanCards_edit(id)" v-if="formEditStatus">
                    <input id="form-edit-title" type="text" v-model="titleEdit" required> <br>
                    <input type="textarea" v-model="descriptionEdit" row="10" cols="50"> <br> <br>
                    <button class="button-edit"><img src="../assets/confirm.png"></button>
                    <img src="../assets/cancel.png" @click.prevent="toggleEdit">
            </form>
            

            <div v-if="!formEditStatus">
            <br>
            <img src="../assets/move-left.png" v-if="category !== categories[0]" @click.prevent="$_KanbanCards_move('Left',id)">
            <img src="../assets/write.png" @click.prevent="toggleEdit">
            <img src="../assets/cancel.png" @click.prevent="$_KanbanCards_delete(id)">
            <img src="../assets/move-right.png" style="float:right" v-if="category !== categories[categories.length-1]" @click.prevent="$_KanbanCards_move('Right',id)">
            </div>
        
    </div>
</template>

<script>
import axios from "axios"
export default {
    props:["id","title","description","user","createdAt","category","categories"],
    data() {
        return {
            titleEdit:"",
            descriptionEdit:"",
            formEditStatus:false,
            plusicon:require("../assets/plus.png")
        }
    },
    methods:{
        toggleEdit() {
            this.formEditStatus = !this.formEditStatus
            if (this.formEditStatus) {
                this.titleEdit=this.title
                this.descriptionEdit=this.description
            } else {
                this.titleEdit=""
                this.descriptionEdit=""
            }
        },
        $_KanbanCards_edit(id) {
            if (confirm(`Are you sure you want to update "${this.title}"?`)) {
                axios({
                method:"PUT",
                url:`http://localhost:3000/tasks/${id}`,
                data:{
                    title:this.titleEdit,
                    description:this.descriptionEdit
                },
                headers:{
                    "access_token":localStorage.getItem("access_token")
                }
            })
            .then(response=>{
                this.$emit("refetchTasks")
                this.toggleEdit()
            })
            .catch(err=>{
                console.log(err)
            })
            }
        },
        $_KanbanCards_delete(id) {
            if (confirm(`Are you sure you want to delete "${this.title}"?`)) {
                axios({
                method:"DELETE",
                url:`http://localhost:3000/tasks/${id}`,
                headers:{
                    "access_token":localStorage.getItem("access_token")
                }
            })
            .then(response=>{
                this.$emit("refetchTasks")
            })
            .catch(err=>{
                console.log(err)
            })
            }
        },
        $_KanbanCards_move(direction,id) {
            let category
            if (direction === "Right") category = this.categories[this.categories.indexOf(this.category)+1]
            else if (direction === "Left") category = this.categories[this.categories.indexOf(this.category)-1]
            // // else    //implement drag here
            axios({
                method:"PATCH",
                url:`http://localhost:3000/tasks/${id}`,
                data:{
                    category
                },
                headers:{
                    "access_token":localStorage.getItem("access_token")
                }
            })
            .then(response=>{
                this.$emit("refetchTasks")
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    computed:{
        $_KanbanCards_refineDate:function() {
            return String(new Date(this.createdAt)).split(" ").slice(1,4).join(" ")
        }
    }
}
</script>

<style scoped>
    .info{
        line-height: 0mm;
        font-size: 0.85em;
        color: gray;
    }
    .title{
        font-size: 1.2em;
    }
    .desc{
        font-size: 1em;
    }
    #kanban-date {
        float: right;
    }
    img {
        width: 30px;
    }
    img:hover {
        cursor: pointer;
    }
    .button-edit {
        padding: 0;
        border: none;
        background: none;
    }
    #form-edit-title {
        margin-bottom:10px
    }
</style>