import { TodolistType} from '../AppWithRedux'
import { v1 } from 'uuid'

export type RemovetodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}

export type AddtodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}

export type ChangeFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    value: string
}



export const todolistId1 = v1()
export const todolistId2 = v1()


let initialState = [
    { id: todolistId1, title: 'What to learn', status: 'all' },
    { id: todolistId2, title: 'What to buy', status: 'all' }
]


export const todoListsReducer = (todolists: Array<TodolistType> = initialState, action: RemovetodolistAT | AddtodolistAT | ChangeTitleAT | ChangeFilterAT): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':

            return todolists.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
        let newTodoList: TodolistType = {
            id: action.todolistId,
            title: action.title,
            status: 'all'
        }
        return [...todolists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            let todolistWithNewTitle = todolists.find(tl => tl.id === action.todolistId)

            if(todolistWithNewTitle){
            todolistWithNewTitle.title = action.title
            return [...todolists]
        }
        return todolists

        case 'CHANGE-TODOLIST-FILTER':
            let todolistNewFilter = todolists.find(tl => tl.id === action.todolistId)
            if(todolistNewFilter){
                todolistNewFilter.status = action.value
            return [...todolists]
        }
        return todolists 
        default:
            return todolists
    }
}

export const RemovetodolistAC = (todolistId: string): RemovetodolistAT => ({
    type: 'REMOVE-TODOLIST',
    todolistId
}) 

export const AddtodolistAC = (title: string): AddtodolistAT => ({
    type: 'ADD-TODOLIST',
    title,
    todolistId: v1()
})

export const ChangeTitleAC = (todolistId: string, title: string): ChangeTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId, 
    title
})

export const ChangeFilterAC = (todolistId: string, value: string): ChangeFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId, 
    value
})