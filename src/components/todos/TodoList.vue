<template>
    <div class="container">
        <h1>Todos</h1>
        <div>
            <router-link class="btn btn-success" to="/todos/new">Add new</router-link>
        </div>

        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Completed</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(todo,index) in todos" :to="'/todos/' + todo.id"
                :key="todo.id" :index="index">
                <td>
                    {{todo.title}}
                </td>
                <td>
                    <label>Completed
                        <input type='checkbox' @click='toggleComplete(todo)' :checked="todo.completed"/>
                    </label>
                </td>
                <td>
                    {{todo.created_at}}
                </td>
                <td>
                    {{todo.updated_at}}
                </td>
                <td>
                    <!-- <span (click)='getDetails(todo)' class='btn btn-info'>Details</span> -->
                    <router-link :to="`/todos/${todo.id}`" class="btn btn-primary active" role="button"
                                 routerLinkActive="active">Details
                    </router-link>
                </td>
                <td>
                    <router-link :to="`/todos/${todo.id}/edit`" class='btn btn-warning'>Edit</router-link>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" @click='deleteTodo(todo)'>Delete</button>
                </td>
            </tr>
            </tbody>
        </table>

    </div>

</template>

<script>
    import {TodoAxiosService} from "../../services/remote/todos.axios.service";
    import {NotificationService} from "@/services/local/notification.service";


    export default {
        name: "TodoList",
        data() {
            return {
                todos: [],
            }
        },
        mounted() {
            return TodoAxiosService.fetchAll().then(response => {
                if (response.status === 200) {
                    NotificationService.showSuccessAlert('Todos fetched successfully');
                    this.todos = response.data;
                }else{
                    NotificationService.showToastError('Something went wrong');
                }
            }).catch(err => {
                NotificationService.showToastError(err.message);
            });
        },
        methods: {
            toggleComplete(todo) {
                TodoAxiosService.update({...todo, completed: !todo.completed}).then(res => {
                    if (res.status === 200) {
                        this.todos = this.todos.map(todo => todo.id === res.id ? res : todo);
                        NotificationService.showSuccessAlert('Todo updated successfully');
                    }
                }).catch(err => {
                    debugger
                    NotificationService.showToastError('Something went wrong');
                });
            },
            deleteTodo(todo) {
                TodoAxiosService.delete(todo).then(res => {
                    // res.statusText === 'No Content' will be true as well
                    if (res.status === 204) {
                        NotificationService.showSuccessAlert('Todo deleted successfully');
                        this.todos = this.todos.filter(t => t.id !== todo.id);
                    }
                }).catch(err => {
                    debugger
                    NotificationService.showToastError('Something went wrong');
                })
            },
        }
    }
</script>

<style scoped>

</style>
