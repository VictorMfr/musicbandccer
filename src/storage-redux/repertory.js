import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModal: false,
    songs: [],
    song: null,
    isLoadingSongs: true,
    updateModal: null
}

const repertoryReducer = createSlice({
    name: 'repertory',
    initialState: initialState,
    reducers: {
        showModal(state) {
            state.isModal = true;
        },
        showModalForUpdate(state, action) {
            state.isModal = true;
            state.updateModal = action.payload.song
        },
        hideModal(state) {
            state.isModal = false;
        },

        setLoadedSongs(state) {
            state.isLoadingSongs = false;
        },

        addSong(state, action) {
            state.songs = [...state.songs, action.payload.song]
        },
        updateSongs(state, action) {
            state.songs = action.payload.songs;
        },
        removeSong(state, action) {
            state.songs = state.songs.filter(song => song._id !== action.payload.song._id)
        },
        updateSong(state, action) {
            state.songs = state.songs.map(song => (song._id === action.payload.song._id)? action.payload.song: song);
            state.updateModal = null; 
        },
        updateSongDetails(state, action) {
            state.song = action.payload.song;
        }
    } 
});

export const repertoryActions = repertoryReducer.actions;
export default repertoryReducer.reducer;