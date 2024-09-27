import { createAction, createReducer } from '@reduxjs/toolkit';
import { PodState } from '../types';
export const addPodcast = createAction<string>('pod/add')
export const pausePodcast = createAction('pod/pause');
export const playPodcast = createAction('pod/play');
export const removePodcast = createAction('pod/remove')

const initialState = { audio: '', pause: false } as PodState;

const podReducer = createReducer(initialState, (builder) => {
  builder.addCase(addPodcast, (state, action) => {
    state.audio = action.payload;
  })
  .addCase(removePodcast, (state) => {
    state.audio = ''
  })
  .addCase(pausePodcast, (state) => {
    state.pause = true;
  })
  .addCase(playPodcast, (state) => {
    state.pause = false;
  })
    
})

export default podReducer;