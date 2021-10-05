import { TodolistType } from '../AppWithRedux'
import { v1 } from 'uuid'
import { todoListsReducer, RemovetodolistAC, AddtodolistAC, ChangeTitleAC, ChangeFilterAC } from './todolists-reducer'




export const todolistId1 = v1()
export const todolistId2 = v1()

let todolists: TodolistType[] = []

beforeEach(()=> {
     todolists = [
        { id: todolistId1, title: 'What to learn', status: 'all' },
        { id: todolistId2, title: 'What to buy', status: 'all' }
    ]
})


test('todolistReducer must remove one todolist', () => {



    const action = RemovetodolistAC(todolistId1) 

    let endState = todoListsReducer(todolists, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
    expect(endState[0].title).toBe('What to buy')

})



test('todolistReducer must add new todolist', () => {



    let newTodolistTitle = 'Welcome to new life'
 
   
    let endState = todoListsReducer(todolists, AddtodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('Welcome to new life')
})



test('todolistReducer must change todolist title', () => {



    let newTodolistTitle = 'Welcome to work finally!'

    const action = ChangeTitleAC(todolistId2, newTodolistTitle)
    
    let endState = todoListsReducer(todolists, action)

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('Welcome to work finally!')
})



test('todolistReducer must change todolist status value', () => {


    let newTodolistStatus = 'completed'

    const action = ChangeFilterAC(todolistId1, newTodolistStatus)

    let endState = todoListsReducer(todolists, action)

    expect(endState.length).toBe(2)
    expect(endState[0].status).toBe('completed')
})

