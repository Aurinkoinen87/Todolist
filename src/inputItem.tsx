import React, { useState, KeyboardEvent, ChangeEvent } from "react"
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'



type InputItemType = {
    addItem:(title: string)=> void
}

const InputItem = React.memo(function(props: InputItemType) {
    console.log('InputItemRendered')


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

    return <div>
        <TextField error={error} helperText={error? 'Incorrect entry.' : ''} label={error? 'Error' : 'Enter task name'} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} value={inputText} />
        <IconButton onClick={sendNewTask}><AddIcon /></IconButton>
    </div>
})


export default InputItem
