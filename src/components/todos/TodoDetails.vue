<template>
    <div v-if="todo.id" class="container">
        <div>
            <h2>{{todo.title}}</h2>

            <br/>
            Description:
            <p>
                {{todo.description}}
            </p>
        </div>
        <div>
        </div>

        <label>Completed
            <input type="checkbox" :checked="todo.completed" disabled/>
        </label>

        <hr/>

        <div class="btn-group btn-group-sm">
            <router-link to="/" type="button" class="btn btn-success">Back</router-link>
            &nbsp;
            <router-link class="btn btn-warning" :to="`/todos/${todo.id}/edit`">Edit</router-link>
            &nbsp;
        </div>
    </div>
</template>

<script>
    import {TodoAxiosService} from "../../services/remote/todos.axios.service";
    import {NotificationService} from "@/services/local/notification.service";

    export default {
        name: "TodoDetails",
        data() {
            return {
                todo: {}
            }
        },
        mounted() {
            TodoAxiosService.fetchById(this.$router.currentRoute.params.id).then(res => {
                if (res.status === 200) {
                    NotificationService.showSuccessAlert('Todo fetched successfully');
                    this.todo = res.data;
                }
            }).catch(err => {
                debugger;
                NotificationService.showToastError(err.message);
            })

        }
    }
</script>

<style scoped>

</style>
