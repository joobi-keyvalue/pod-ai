import { createAction, createReducer } from '@reduxjs/toolkit';
import { PodState } from '../types';
export const addPodcast = createAction<string>('pod/add')
export const removePodcast = createAction('pod/remove')

const initialState = { audio: '' } as PodState;

const podReducer = createReducer(initialState, (builder) => {
  builder.addCase(addPodcast, (state, action) => {
    state.audio = action.payload;
  })
  .addCase(removePodcast, (state) => {
    state.audio = ''
  })
    
})

export default podReducer;