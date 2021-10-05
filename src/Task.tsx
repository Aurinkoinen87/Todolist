import React, {useCallback} from 'react'
import { TaskType } from './AppWithRedux'
import { EditableSpan } from './EditableSpan'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlineIcon from '@material-ui/icons/Delete';
import {useDispatch} from 'react-redux';
import style from './Todolist.module.css'
import { removeTaskAC, changeTitleAC, changeTaskStatusAC } from './store/tasks-reducer'


type TaskPropsType = {
    task: TaskType
    todolistId: string
}



export const Task: React.FC<TaskPropsType> = React.memo(function ({task, todolistId}) {

    const dispatch = useDispatch()


    
    const editTask = useCallback((title: string) => {
    
        dispatch(changeTitleAC(todolistId, task.id, title))
    
    }, [todolistId, task])
    
    const deleteTask = () => {
    
        dispatch(removeTaskAC(todolistId, task.id))
    
    }
    
    const markAsCompleted = (checked: boolean) => {
    
        dispatch(changeTaskStatusAC(todolistId, task.id, checked))
    
    
    }





    return <li key={task.id} className={task.isDone ? style.is_done : ''}>

        <input type="checkbox" onChange={(e) => markAsCompleted(e.currentTarget.checked)} checked={task.isDone} />
        
        <EditableSpan title={task.taskName} editedItem={editTask} />

        <IconButton onClick={() => deleteTask()}>
            <DeleteOutlineIcon />
        </IconButton>

    </li>
})