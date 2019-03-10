import {AxiosService} from "./base/axios.service";
import {NotificationService} from "../local/notification.service";

export const TodoAxiosService = {
    fetchAll(query = {}) {
        if (query.completed)
            return AxiosService.get('todos/pending', query);
        else if (query.completed === false)
            return AxiosService.get('todos/completed', query);
        else
            return AxiosService.get('todos', query);

    },
    fetchById(id) {
        return AxiosService.get(`/todos/${id}`);
    },
    create(todo) {
        return AxiosService.post('/todos', todo);
    },
    update(todo) {
        return AxiosService.put(`/todos/${todo.id}`, todo);
    },
    delete(todo) {
        return AxiosService.delete(`/todos/${todo.id}`);
    },


};
