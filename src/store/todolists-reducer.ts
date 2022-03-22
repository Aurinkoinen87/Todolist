import { todolistsApi, TodolistType } from './../api/application-api'
import { Dispatch } from 'redux'
import { TodolistsFilterType } from './../Todolist'
import { loadingOn, loadingOff, resultCodeError } from './../common-components/notifications'
import { AxiosError } from 'axios'
import { fetchTasks } from './tasks-reducer'
import { LogOutAT } from './auth-reducer'



// export const todolistId1 = v1()
// export const todolistId2 = v1()


// let initialState = [
//     { id: todolistId1, title: 'What to learn', status: 'all' },
//     { id: todolistId2, title: 'What to buy', status: 'all' }
// ]

export type TodolistAppType = TodolistType & {filter: TodolistsFilterType}


type ActionsType = getTodolistsAT | RemovetodolistAT | AddtodolistAT | ChangeTitleAT | ChangeFilterAT | LogOutAT

export const todoListsReducer = (state: TodolistAppType[] = [], action: ActionsType): TodolistAppType[] => {
    switch (action.type) {
        case 'GET-TODOLISTS':
            return action.payload.todolists.map((t)=> ({...t, filter: 'all'}))
    
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)

        case 'ADD-TODOLIST':
        return [{...action.todoList, filter: 'all'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl) => (tl.id === action.todolistId)? {...tl, title : action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) => (tl.id === action.todolistId)? {...tl, filter : action.value} : tl)
        case 'LOG_OUT':
            return []
        
        default:
            return state
    }
}

export type getTodolistsAT = ReturnType<typeof getTodolistsAC>
export type RemovetodolistAT = ReturnType<typeof RemovetodolistAC>
export type AddtodolistAT = ReturnType<typeof AddtodolistAC>
type ChangeTitleAT = ReturnType<typeof ChangeTitleAC>
type ChangeFilterAT = ReturnType<typeof ChangeFilterAC>

export const RemovetodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST',todolistId} as const) 
export const AddtodolistAC = (todoList: TodolistType) => ({type: 'ADD-TODOLIST',todoList} as const)
export const ChangeTitleAC = (todolistId: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE',todolistId,title} as const)
export const ChangeFilterAC = (todolistId: string, value: TodolistsFilterType) => ({type: 'CHANGE-TODOLIST-FILTER',todolistId, value} as const)
export const getTodolistsAC = (todolists: TodolistType[]) => ({type: 'GET-TODOLISTS',payload:{todolists}} as const)


export const fetchTodolists = () => 
    (dispatch: any) => {
    loadingOn(dispatch)
    todolistsApi.getTodolists()
    .then((res)=> {dispatch(getTodolistsAC(res.data))
        return(res.data)})
        .then((tlArr)=> tlArr.forEach((tl)=> dispatch(fetchTasks(tl.id))))
        .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
        .finally(()=>loadingOff(dispatch))   
}
    
export const createTodolist = (title: string) => 
        (dispatch: Dispatch) => {
        loadingOn(dispatch)
        todolistsApi.createTodolist(title)
        .then((res)=> 
        {if(res.data.resultCode === 0)
        {dispatch(AddtodolistAC(res.data.data.item))}
        else{resultCodeError(dispatch, res.data.messages[0])}})
        .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
        .finally(()=> loadingOff(dispatch))}

 
    

export const updateTodolist = (todolistId: string, title: string) => 
        (dispatch: Dispatch) => {
        loadingOn(dispatch)
        todolistsApi.updateTodolist(todolistId, title)
        .then((res)=> {if(res.data.resultCode === 0){dispatch(ChangeTitleAC(todolistId, title))}
                        else {resultCodeError(dispatch, res.data.messages[0])}})
        .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
        .finally(()=> loadingOff(dispatch))}


export const deleteTodolistTC = (todolistId: string) => 
        (dispatch: Dispatch) => {
            loadingOn(dispatch)
            todolistsApi.deleteTodoList(todolistId)
            .then((res)=> {
                if(res.data.resultCode === 0){dispatch(RemovetodolistAC(todolistId))}
                else {resultCodeError(dispatch, res.data.messages[0])}})
            .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
            .finally(()=> loadingOff(dispatch))}



