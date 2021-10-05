import React, { useState, ChangeEvent } from "react"
import TextField from '@material-ui/core/TextField'




type EditableSpanType = {
    title: string
    editedItem: (title: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanType) {
    console.log('EditableSpanRendered')



    let [editMode, setEditMode] = useState<boolean>(false)

    let [inputText, setInputText] = useState<string>(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setInputText(e.currentTarget.value) }

    const editTask = () => {
        setEditMode(false);
        inputText.trim() && props.editedItem(inputText.trim())
        
    }


    return (<>
        {editMode ? <TextField onChange={onChangeHandler} value={inputText} autoFocus onBlur={editTask} /> : <span onDoubleClick={() => setEditMode(true)}>{props.title}</span>}
    </>)
})

