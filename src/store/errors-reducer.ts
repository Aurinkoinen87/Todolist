

export type StatusType = 'idle' | 'loading' | 'succeded' | 'failed' 

export type ErrorStateType = {
    status: StatusType
    error: string | null 
}

let initialState: ErrorStateType = {
    status: 'idle',
    error: null 
}


export const errorsReducer = (state: ErrorStateType = initialState, action: ActionsType) => {
    switch(action.type){
        case 'CHANGE-STATUS':
            return {...state, status: action.status}
        case 'SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}


type LoadingAT = ReturnType<typeof loadingAC> 
type ShowErrorAT = ReturnType<typeof showErrorAC> 
type ActionsType = LoadingAT | ShowErrorAT

export const loadingAC = (status: string) => ({type: 'CHANGE-STATUS', status} as const)
export const showErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)

