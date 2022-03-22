import React, {useCallback} from 'react'
import { TaskType, TaskStatus } from './api/application-api'
import { EditableSpan } from './common-components/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useDispatch} from 'react-redux';
import style from './Todolist.module.css'
import { deleteTaskThunk, updateTask } from './store/tasks-reducer'
import { StatusType } from './store/errors-reducer'


type TaskPropsType = {
    task: TaskType
    todolistId: string
    errorStatus: StatusType
}



export const Task: React.FC<TaskPropsType> = React.memo(function ({task, todolistId, errorStatus}) {

    const dispatch = useDispatch()
    

    
    const editTask = useCallback((title: string) => {
    
        dispatch(updateTask(todolistId, task.id, {title: title}))
    
    }, [todolistId, task])
    
    const deleteTask = () => {
    
        dispatch(deleteTaskThunk(todolistId, task.id))
    
    }
    
    const markAsCompleted = (checked: boolean) => {
        checked? task.status = 1 : task.status = 0
        dispatch(updateTask(todolistId, task.id, {status: task.status}))
    }





    return <li key={task.id} className={task.status === 1 ? style.is_done : ''}>

        <input type="checkbox" onChange={(e) => markAsCompleted(e.currentTarget.checked)} checked={!!task.status} />
        
        <EditableSpan title={task.title} editedItem={editTask} />

        <IconButton onClick={() => deleteTask()} disabled={errorStatus === 'loading'}>
            <DeleteOutlineIcon />
        </IconButton>

    </li>
})