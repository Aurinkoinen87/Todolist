import React, { useCallback } from "react";
import InputItem from './inputItem'
import {EditableSpan} from './EditableSpan'
import { ListType } from './AppWithRedux'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import style from './Todolist.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskAC } from './store/tasks-reducer'
import { rootReducerType } from './store/state'
import { TasksState } from './AppWithRedux'
import {Task} from './Task'
import { RemovetodolistAC, ChangeTitleAC, ChangeFilterAC } from './store/todolists-reducer'





type PropsType = {
    title: string
    id: string
    status: ListType
}




export const Todolist = React.memo(function (props: PropsType) {

    console.log('TodolistRendered')

    const dispatch = useDispatch()
    const tasks = useSelector<rootReducerType, TasksState>(state => state.tasks)




    const addTask = useCallback((value: string) => {

        dispatch(addTaskAC(props.id, value))

    }, [props.id])



    const editTodolistTitle = useCallback((title: string) => {

        dispatch(ChangeTitleAC(props.id, title))

    }, [props.id])


    const deleteTodolist = useCallback(() => {

        dispatch(RemovetodolistAC(props.id))

    }, [props.id])



    const changeTasksStatus = useCallback((status: ListType) => {

        dispatch(ChangeFilterAC(props.id, status))
    }, [props.id])







    let tasksForToDoList = tasks[props.id]


    if (props.status === 'active') {
        tasksForToDoList = tasksForToDoList.filter(i => i.isDone === false)

    }

    if (props.status === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(i => i.isDone === true)

    }


    return (<div className={style.gap}>
        <h3>
            <EditableSpan title={props.title} editedItem={editTodolistTitle} />


            <IconButton onClick={() => deleteTodolist()}>
                <DeleteIcon />
            </IconButton>
        </h3>

        <InputItem addItem={addTask} />
        <ul>
            {tasksForToDoList.map((t) => {
               return <Task key={t.id} task={t} todolistId={props.id} />
                
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

