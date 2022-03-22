import React, { useState, KeyboardEvent, ChangeEvent } from "react"
import { useSelector } from 'react-redux'
import { rootReducerType } from './../store/state'
import { ErrorStateType } from './../store/errors-reducer'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import s from './inputItem.module.css'



type InputItemType = {
    addItem:(title: string)=> void
}

const InputItem = React.memo(function(props: InputItemType) {
    console.log('InputItemRendered')

    const errorsState = useSelector<rootReducerType, ErrorStateType>(state => state.errors)
    const loading = errorsState.status

    let[inputText, setInputText] = useState<string>('')

    let[error, setError] = useState<boolean>(false)

    const addItem = () => props.addItem(inputText.trim())

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        
        setInputText(e.currentTarget.value);
         if(error){setError(false)}}

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        
        if(e.key === 'Enter'){if(inputText.trim() !== ''){
        addItem();
        setInputText('')}else{setError(true)}}}

    const sendNewTask = () => {if(inputText.trim() !== ''){        
        addItem();
        setInputText('')}else{setError(true)}}

    return <div className={s.main_input}>
        <TextField error={error} helperText={error? 'Incorrect entry.' : ''} label={error? 'Error' : 'Enter todolist name'} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} value={inputText} />
        <IconButton onClick={sendNewTask} disabled={loading === 'loading'}><AddIcon /></IconButton>
    </div>
})


export default InputItem
