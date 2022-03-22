import { authAPI, LoginType } from './../api/application-api'
import { Dispatch } from 'redux'
import { loadingOn, loadingOff, resultCodeError } from './../common-components/notifications'
import { AxiosError } from 'axios'



type AuthAT = ReturnType<typeof authAC>
export type LogOutAT = ReturnType<typeof logOutAC>
type InitAT = ReturnType<typeof initAC>

type ActionsType = AuthAT | LogOutAT | InitAT


export type AuthStateType = {
    isLogged: boolean
    userId: number | null
    initialized: boolean
}

let initialState: AuthStateType = {
    isLogged: false,
    userId: null,
    initialized: false
}

export const authReducer = (state: AuthStateType = initialState, action: ActionsType): AuthStateType => {
    switch(action.type) {
        case 'LOGGED_IN':
            return {...state, isLogged: true, userId: action.userId}
        case 'LOG_OUT':
            return {...state, isLogged: false, userId: null}
        case 'INIT':
            return {...state, initialized: true}
        default:
            return state
    }
}

const authAC = (userId: number) => ({type: 'LOGGED_IN', userId} as const)
const logOutAC = () => ({type: 'LOG_OUT'} as const)
const initAC = () => ({type: 'INIT'} as const)


export const authTC = (logData: LoginType) => 
    (dispatch: Dispatch) => {
        authAPI.login(logData)
        .then((res)=> {
            if(res.data.resultCode === 0){
                dispatch(authAC(res.data.data.userId))
            } else {
                resultCodeError(dispatch, res.data.messages[0])
            }
            })
            .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
        }

export const authMeTC = () => (dispatch: Dispatch) => authAPI.me()
    .then((res)=> {
    if(res.data.resultCode === 0){
    dispatch(authAC(res.data.data.id))}
    })
    .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
    .finally(()=> dispatch(initAC()))
        


export const logOutTC = () => (dispatch: Dispatch) => {
loadingOn(dispatch)
authAPI.logout()
.then((res)=> {
    if(res.data.resultCode === 0){
    dispatch(logOutAC())
   } else {
   resultCodeError(dispatch, res.data.messages[0])}})
   .catch((error: AxiosError) => resultCodeError(dispatch, error.message))
   .finally(()=> loadingOff(dispatch))}


