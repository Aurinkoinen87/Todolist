import React, { useCallback } from 'react';
import InputItem from './common-components/inputItem'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { createTodolist } from './store/todolists-reducer'
import { useSelector ,useDispatch } from 'react-redux'
import { TodoLists } from './TodoLists'
import { Linear } from './common-components/progress_bar'
import { ErrorStateType } from './store/errors-reducer'
import { rootReducerType } from './store/state'
import CustomizedSnackbars from './common-components/error_message'
import { HeaderAppBar } from './AppBar'
import { Redirect } from 'react-router-dom'





type PropsType = {
    isLogged: boolean
}


export const TodoListsPage = React.memo(function(props: PropsType){
    
    const dispatch = useDispatch()

    const progress = useSelector<rootReducerType, ErrorStateType>(state => state.errors)

    const addTodoList = useCallback((title: string) => {

        dispatch(createTodolist(title))

    }, [dispatch])


    if(!props.isLogged){
        return <Redirect to={'/login'} />
    }

    
    return (
        <>
            <HeaderAppBar />
            {(progress.status === 'loading') && <Linear />}
            <div className="app_wrapper">
                <Container fixed style={{ padding: '20px' }}>
                    <InputItem addItem={addTodoList} />

                    <Grid container spacing={3}>
                        <TodoLists isLogged={props.isLogged}/>
                    </Grid>
                </Container>
                <CustomizedSnackbars error={progress.error} />
            </div>
        </>
    )
})