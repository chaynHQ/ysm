import {axiosInstance} from './axios'

/*
 * action types
 */
export const ADD_USER_INPUT = 'ADD_USER_INPUT';

/*
 * action creators
 */
export const addUserInputToStack = (text: any) => ({
  type: ADD_USER_INPUT,
  text,
});

export function fetchResources() {
    return async (dispatch: any) => {
      try {
        console.log("FETCHING")
        const response = await axiosInstance.get('resources');
        console.log(response);
        dispatch(addUserInputToStack)
      } catch {
        console.log('error')
      }
    };
  }