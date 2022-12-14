import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModal: false,
    songs: [],
    song: null,
    isModalForDelete: false,
    isLoadingSongs: true,
    updateModal: null,
    filterSearchedSong: '',
    filterSongType: '',
    filterSongTone: '',
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
        showModalForDelete(state, action) {
            state.isModalForDelete = true;
            state.updateModal = action.payload.song
        },
        hideModal(state) {
            state.isModal = false;
            state.isModalForDelete = false;
            state.updateModal = null;
            state.song = null;
        },
        hideModalForDelete(state) {
            state.isModal = false;
            state.isModalForDelete = false;
            state.updateModal = null;
            state.song = null;
        },
        hideModalForUpdate(state) {
            state.isModal = false;
            state.isModalForDelete = false;
            state.updateModal = null;
            state.song = null;
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
        },
        updateFilteredSearchedSong(state, action) {
            state.filterSearchedSong = action.payload.filterSearchedSong;
        },
        updateFilteredSongType(state, action) {
            state.filterSongType = action.payload.filterSongType;
        },
        updateFilteredSongTone(state, action) {
            state.filterSongTone = action.payload.filterSongTone;
        }
    } 
});

export const repertoryActions = repertoryReducer.actions;
export default repertoryReducer.reducer;