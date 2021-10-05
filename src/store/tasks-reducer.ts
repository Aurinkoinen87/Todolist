import { v1 } from 'uuid'
import { TasksState } from '../AppWithRedux'
import { AddtodolistAT, RemovetodolistAT } from './todolists-reducer'
import {todolistId1, todolistId2} from './todolists-reducer'

type removeTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

type addTaskAT = {
    type: 'ADD-TASK'
    todolistId: string
    value: string
}
type changeTaskTitleAT = {
    type: 'CHANGE-TASKTITLE'
    todolistId: string
    taskId: string
    taskTitle: string
}
type changeTaskStatusAT = {
    type: 'CHANGE-TASKSTATUS'
    todolistId: string
    taskId: string
    checked: boolean
}




let initialState = {
    [todolistId1]:
        [{ id: v1(), taskName: 'HTML&CSS', isDone: false },
        { id: v1(), taskName: 'Javascript', isDone: false },
        { id: v1(), taskName: 'React', isDone: true }],
    [todolistId2]:
        [
            { id: v1(), taskName: 'Coca-cola', isDone: false },
            { id: v1(), taskName: 'Ice', isDone: true },
            { id: v1(), taskName: 'Whiskey', isDone: false }]
}

export const tasksReducer = (state: TasksState = initialState , action: removeTaskAT | addTaskAT | changeTaskTitleAT | changeTaskStatusAT | AddtodolistAT | RemovetodolistAT): TasksState => {
    switch (action.type) {
        case 'REMOVE-TASK':
            state[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskId)

            return { ...state }

        case 'ADD-TASK':
            let newTask = {
                id: v1(),
                taskName: action.value,
                isDone: false
            }
            let newArray = [...state[action.todolistId], newTask]
            state[action.todolistId] = newArray


            return { ...state }
        case 'CHANGE-TASKTITLE':
            state[action.todolistId] = state[action.todolistId].map(t => t.id === action.taskId ? { ...t, taskName: action.taskTitle } : t)
            return { ...state }
        case 'CHANGE-TASKSTATUS':
            state[action.todolistId] = state[action.todolistId].map(t => t.id === action.taskId ? { ...t, isDone: action.checked } : t)
            return { ...state }
        case 'ADD-TODOLIST':
            return { ...state, [action.todolistId] : [] }
        case 'REMOVE-TODOLIST':
            
            delete state[action.todolistId]
            return {...state}

        default:
            return state

    }
}


export const removeTaskAC = (todolistId: string, taskId: string): removeTaskAT => ({ type: 'REMOVE-TASK', todolistId, taskId })
export const addTaskAC = (todolistId: string, value: string): addTaskAT => ({ type: 'ADD-TASK', todolistId, value })
export const changeTitleAC = (todolistId: string, taskId: string, taskTitle: string): changeTaskTitleAT => ({
    type: 'CHANGE-TASKTITLE',
    todolistId, taskId, taskTitle
})

export const changeTaskStatusAC = (todolistId: string, taskId: string, checked: boolean): changeTaskStatusAT => ({
    type: 'CHANGE-TASKSTATUS', todolistId, taskId, checked
})
