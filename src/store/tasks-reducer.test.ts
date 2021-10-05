import { todolistId1, todolistId2 } from './todolists-reducer.test'
import { v1 } from 'uuid'
import { tasksReducer, removeTaskAC, addTaskAC, changeTitleAC, changeTaskStatusAC } from './tasks-reducer'
import {AddtodolistAC, RemovetodolistAC} from './todolists-reducer'











test('one task must be removed', () => {

    let tasks = {
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



    let endState = tasksReducer(tasks, removeTaskAC(todolistId1, tasks[todolistId1][1].id))
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId1][1].taskName).toBe('React')
})


test('one task must be added', () => {


    let tasks = {
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

    let value = 'titimiti'

    let endState = tasksReducer(tasks, addTaskAC(todolistId1, value))
    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId1][3].taskName).toBe('titimiti')
})

test('task title must be changed', () => {


    let tasks = {
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


    let newTitle = 'find new girlfriend'

    let endState = tasksReducer(tasks, changeTitleAC(todolistId1, tasks[todolistId1][2].id, newTitle))
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][2].taskName).toBe(newTitle)
})

test('task must be completed', () => {


    let tasks = {
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


    let endState = tasksReducer(tasks, changeTaskStatusAC(todolistId2, tasks[todolistId2][2].id, true))
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][2].isDone).toBeTruthy()
})



test('task array must be added', () => {


    let tasks = {
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
    let newTodolistTitle = 'Welcome to new life'

    let endState = tasksReducer(tasks, AddtodolistAC(newTodolistTitle))
    let keys = Object.keys(endState)
    expect(keys.length).toBe(3)
    expect(endState[keys[2]]).toEqual([])
})

test('task array must be removed', () => {


    let tasks = {
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

    let endState = tasksReducer(tasks, RemovetodolistAC(todolistId2))
    let keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState[keys[0]]).toBeDefined()
})