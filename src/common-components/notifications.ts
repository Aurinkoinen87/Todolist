import { loadingAC, showErrorAC } from './../store/errors-reducer' 
import { Dispatch } from 'redux'


export const loadingOff = (dispatch: Dispatch) => dispatch(loadingAC('succeded'))
export const loadingOn = (dispatch: Dispatch) => dispatch(loadingAC('loading'))

export const resultCodeError = (dispatch: Dispatch, message: string) => { 
 dispatch(showErrorAC(message || 'some error occured'))}
