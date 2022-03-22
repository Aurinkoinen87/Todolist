import React, { useCallback, useEffect } from "react";
import InputItem from './common-components/inputItem'
import {EditableSpan} from './common-components/EditableSpan'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import style from './Todolist.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { createNewTask } from './store/tasks-reducer'
import { rootReducerType } from './store/state'
import {Task} from './Task'
import { deleteTodolistTC, updateTodolist, ChangeFilterAC } from './store/todolists-reducer'
import { TasksStateType } from './store/tasks-reducer'
import { ErrorStateType } from './store/errors-reducer'




export type TodolistsFilterType = 'all' | 'active' | 'completed'

type PropsType = {
    title: string
    id: string
    status: TodolistsFilterType
}




export const Todolist = React.memo(function (props: PropsType) {

    console.log('TodolistRendered')



    const dispatch = useDispatch()

    const tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasks)

    const errorsState = useSelector<rootReducerType, ErrorStateType>(state => state.errors)
    


    const addTask = useCallback((value: string) => {

        dispatch(createNewTask(props.id, value))

    }, [props.id])



    const editTodolistTitle = useCallback((title: string) => {

        dispatch(updateTodolist(props.id, title))

    }, [props.id])


    const deleteTodolist = useCallback(() => {

        dispatch(deleteTodolistTC(props.id))

    }, [props.id])



    const changeTasksStatus = useCallback((status: TodolistsFilterType) => {

        dispatch(ChangeFilterAC(props.id, status))
    }, [props.id])







    let tasksForToDoList = tasks[props.id]


    if (props.status === 'active') {
        tasksForToDoList = tasksForToDoList.filter(i => i.status === 0)

    }

    if (props.status === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(i => i.status === 1)

    }


    return (<div className={style.gap}>
        <h3>
            <EditableSpan title={props.title} editedItem={editTodolistTitle} />


            <IconButton onClick={() => deleteTodolist()} disabled={errorsState.status === 'loading'}>
                <DeleteIcon />
            </IconButton>
        </h3>

        <InputItem addItem={addTask} />
        <ul>
            {tasksForToDoList.map((t) => {
               return <Task key={t.id} task={t} todolistId={props.id} errorStatus={errorsState.status} />
                
            }
            )}
        </ul>
        <div>
            <Button variant={props.status === 'all' ? 'contained' : 'text'} onClick={()=> changeTasksStatus('all')}>All</Button>
            <Button variant={props.status === 'active' ? 'contained' : 'text'} color='primary' onClick={()=> changeTasksStatus('active')}>Active</Button>
            <Button variant={props.status === 'completed' ? 'contained' : 'text'} color='secondary' onClick={()=> changeTasksStatus('completed')}>Completed</Button>
        </div>
    </div>)
})

