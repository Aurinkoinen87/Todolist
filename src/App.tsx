import React, { useEffect } from 'react'
import './App.css';
import { Login } from './Login'
import { Route, Redirect, Switch } from 'react-router-dom'
import { TodoListsPage } from './TodoListsPage'
import { useSelector, useDispatch } from 'react-redux'
import { rootReducerType } from './store/state'
import { authMeTC } from './store/auth-reducer'
import CircularProgress from '@mui/material/CircularProgress';





function App() {

    console.log('me rendered')


    const dispatch = useDispatch()
    
    useEffect(()=> {dispatch(authMeTC())},[]
    )

    const isLogged = useSelector<rootReducerType, boolean>(state => state.auth.isLogged)
    const initialized = useSelector<rootReducerType, boolean>(state => state.auth.initialized)

    if(!initialized){
        return <div className='init_circle'><CircularProgress color="secondary" />
        </div>}
    
    
    return (
        <div className="App">
            <Switch>
            <Route path={'/login'} render={()=> <Login isLogged={isLogged} />}/>
            <Route exact path={'/'} render={()=> <TodoListsPage isLogged={isLogged} />}/>
            <Route path={'/404'} render={()=> <h1 style={{textAlign: 'center', fontSize: '55px'}}>404 page not found</h1>}/>
            <Redirect from={'*'} to={'/404'} />
            </Switch>
        </div>
    );
}

export default App;
