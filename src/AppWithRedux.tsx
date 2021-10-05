import React from 'react';
import './App.css';
import InputItem from './inputItem'
import { Todolist } from './Todolist';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { AddtodolistAC } from './store/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducerType } from './store/state'
import { useCallback, useMemo } from 'react';


export type TaskType = {
    id: string
    taskName: string
    isDone: boolean
}



export type TasksType =
    TaskType[]

export type TodolistType = {
    id: string
    title: string
    status: ListType
}

export type ListType = 'all' | 'completed' | 'active' | string

export type TasksState = {
    [key: string]: TasksType
}



function AppWithRedux() {

    console.log('AppRendered')



    const dispatch = useDispatch()

    const todolists = useSelector<rootReducerType, Array<TodolistType>>(state => state.todolists)


    const addTodoList = useCallback((title: string) => {

        dispatch(AddtodolistAC(title))

    }, [dispatch])

    
    
    let todolistsArray = todolists.map((tl) => {
        return (<Grid item><Paper variant="outlined"><Todolist key={tl.id} id={tl.id} title={tl.title} status={tl.status} /></Paper></Grid>)})
    

    
    
    return (
        <div className="App">
            <Container fixed style={{ padding: '20px' }}>
                <Grid container spacing={3}>
                    <InputItem addItem={addTodoList} />
                             {todolistsArray}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
