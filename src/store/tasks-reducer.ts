import { AddtodolistAT, RemovetodolistAT, getTodolistsAT } from './todolists-reducer'
import { todolistsApi } from './../api/application-api'
import { TaskType, TaskStatus } from './../api/application-api'
import { Dispatch } from 'redux'
import { rootReducerType } from './state'
import { loadingOn, loadingOff, resultCodeError } from './../common-components/notifications'
import { LogOutAT } from './auth-reducer'
import { AxiosError } from 'axios'







// let initialState = {
//     [todolistId1]:
//         [{ id: v1(), taskName: 'HTML&CSS', isDone: false },
//         { id: v1(), taskName: 'Javascript', isDone: false },
//         { id: v1(), taskName: 'React', isDone: true }],
//     [todolistId2]:
//         [
//             { id: v1(), taskName: 'Coca-cola', isDone: false },
//             { id: v1(), taskName: 'Ice', isDone: true },
//             { id: v1(), taskName: 'Whiskey', isDone: false }]
// }


type ActionTypes = removeTaskAT | addTaskAT | changeTaskAT | AddtodolistAT | RemovetodolistAT | getTodolistsAT | getTasksAT | LogOutAT


export type TasksStateType = {[key: string]: TaskType[]}

export const tasksReducer = (state: TasksStateType = {} , action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':

            return {...state, [action.todolistId] : state[action.todolistId].filter(t => t.id !== action.taskId)}

        case 'ADD-TASK':

            return { ...state, [action.task.todoListId] : [action.task, ...state[action.task.todoListId]]}

        case 'CHANGE-TASK':
            
            return { ...state, [action.task.todoListId] : state[action.task.todoListId].map(t=> (t.id === action.task.id)? {...t, ...action.task} : t)}
            
        case 'ADD-TODOLIST':
            return { ...state, [action.todoList.id] : [] }
        case 'REMOVE-TODOLIST':
            
            delete state[action.todolistId]
            return {...state}
        case 'GET-TASKS':
            return { ...state, [action.todolistId] : action.tasks}
        case 'GET-TODOLISTS':
            let newState = {...state}
            action.payload.todolists.forEach((tl)=> newState[tl.id] = [])
            return newState
        case 'LOG_OUT':
            return {}
        default:
            return state

    }
}

type removeTaskAT = ReturnType<typeof removeTaskAC>
type addTaskAT = ReturnType<typeof addTaskAC>
type changeTaskAT = ReturnType<typeof changeTaskAC>
type getTasksAT = ReturnType<typeof getTasksAC>

export const removeTaskAC = (todolistId: string, taskId: string) => ({ type: 'REMOVE-TASK', todolistId, taskId } as const)
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task} as const)
export const changeTaskAC = (task: TaskType) => ({type: 'CHANGE-TASK', task} as const)
const getTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'GET-TASKS',todolistId, tasks} as const)


export const fetchTasks = (todolistId: string) => 
        (dispatch: Dispatch) => {
        loadingOn(dispatch)
        todolistsApi.getTasks(todolistId)
        .then((res)=> {
            if(res.data.error === null){dispatch(getTasksAC(todolistId,res.data.items))}
            else {resultCodeError(dispatch, res.data.error)}
        })
        .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
        .finally(()=> loadingOff(dispatch))}
    


type TaskUpdateType = {
    status?: TaskStatus
    title?: string
}


export const updateTask = (todolistId: string, taskId: string, taskUpdate: TaskUpdateType) => 
        (dispatch: Dispatch, getState: () => rootReducerType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if(!task){
            throw new Error('Some shit happened') 
        }
        const model = {    
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            completed: false,
            status: task.status,
            ...taskUpdate
        }
        loadingOn(dispatch)
        todolistsApi.updateTaskStatus(todolistId, taskId, model)
        .then((res)=> {
        if(res.data.resultCode === 0){dispatch(changeTaskAC(res.data.data.item))}
        else {resultCodeError(dispatch, res.data.messages[0])}})
        .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
        .finally(()=> loadingOff(dispatch))
        }
        


export const createNewTask = (todolistId: string, title: string) => 
        (dispatch: Dispatch) => {
            loadingOn(dispatch)
            todolistsApi.createTask(todolistId, title).then((res)=>
        {if(res.data.resultCode === 0){
            dispatch(addTaskAC(res.data.data.item))} 
        else {resultCodeError(dispatch, res.data.messages[0])}})
        .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
        .finally(()=> loadingOff(dispatch))
    }


export const deleteTaskThunk = (todolistId: string, taskId: string) => 
        (dispatch: Dispatch) => {
            loadingOn(dispatch)
            todolistsApi.deleteTask(todolistId, taskId)
            .then((res)=> 
            {if(res.data.resultCode === 0){
            dispatch(removeTaskAC(todolistId ,taskId))}
            else {resultCodeError(dispatch, res.data.messages[0])}})
            .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
            .finally(()=> loadingOff(dispatch))
    }
