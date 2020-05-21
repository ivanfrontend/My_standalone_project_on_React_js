import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3005/',
    withCredentials: true,
    // headers: {
    //     "API-KEY": 'secret'
    // }
});



export const tasksAPI = {
    getTasks(completedTask, notDoneTask) {
        return instance.get(`api/task?completedTask=${completedTask}&notDoneTask=${notDoneTask}`).then(response => response.data)
    },
    addTask(title, body) {
         return instance.post(`api/task`, {title, body}).then(response => response.data)
    },
    getItemTask(taskID) {
        return instance.get(`api/task/${taskID}`).then(response => response.data)
    },
    deleteTask(taskId) {
        return instance.delete(`api/task/${taskId}`).then(response => response.data)
    },
    updateTask(taskId, title, body, stateTask) {
        return instance.put(`api/task/${taskId}`, {title, body, stateTask }).then(response => response.data)
    }
}
export const registrAPI = {
    registr(name, email, password) {
         return instance.post(`api/registration`, {name, email, password}).then(response => response.data)
    }

}
export const authAPI = {
    me() {
         return instance.get(`api/auth`).then(response => response.data)
    },
    auth(email, password) {
         return instance.post(`api/auth`, {email, password}).then(response => response.data)
    },
    logaut() {
        return instance.delete('api/auth').then(response => response.data)
    }

}