import { fetchTodolists } from './store/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducerType } from './store/state'
import React, { useEffect } from 'react';
import { TodolistAppType } from './store/todolists-reducer'
import { Todolist } from './Todolist';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'



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
        status: string
    }
    
    export type TasksState = {
        [key: string]: TasksType
    }
    type PropsType = {
        isLogged: boolean
    }

    export const TodoLists = React.memo(function(props: PropsType) {
        const dispatch = useDispatch()

        useEffect(()=>{
            if(props.isLogged){
            dispatch(fetchTodolists())}
        },[])
    
        const todolists = useSelector<rootReducerType, TodolistAppType[]>(state => state.todolists)
    
    
    
    
    let todolistsArray = todolists.map((tl) => {
        return (<Grid item key={tl.id}><Paper variant="outlined"><Todolist id={tl.id} title={tl.title} status={tl.filter} /></Paper></Grid>)})
    
        return(
            <>
            {todolistsArray}
            </>
        )
    })