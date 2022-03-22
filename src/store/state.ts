import { createStore, combineReducers, applyMiddleware  } from "redux";
import { todoListsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'
import { errorsReducer } from './errors-reducer'
import { authReducer } from './auth-reducer'
import thunk from 'redux-thunk';



const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer,
    errors: errorsReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type rootReducerType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store