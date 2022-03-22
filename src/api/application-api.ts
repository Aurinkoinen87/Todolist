import axios from 'axios'


export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: TaskStatus
    title: string
    todoListId: string
    completed: boolean
}


export type TaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TaskCommonType = {
    error: string
    totalCount: number
    items: TaskType[]
}




export type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
    }

export type AuthMeResponseDataType = {
    id: number
    email: string
    login: string
}

export enum TaskStatus {
    New = 0,
    Completed = 1
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'api-key': 'd9cca70e-448c-4096-85fa-0bb268b450a3'
    }
})



export const todolistsApi = {
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', { title: title })
    },
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, { title })
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
    },
    getTasks(todolistId: string) {
        return instance.get<TaskCommonType>(`/todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskStatus(todolistId: string, taskId: string, model: TaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export const authAPI = {
    login(obj: LoginType){
        return instance.post<ResponseType<{userId: number}>>('/auth/login', obj)
    },
    me(){
        return instance.get<ResponseType<AuthMeResponseDataType>>('/auth/me')
    },
    logout(){
        return instance.delete<ResponseType>('/auth/login')
    }
}