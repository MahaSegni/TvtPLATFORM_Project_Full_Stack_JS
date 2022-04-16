import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    connectedUser: {type : "disconnected"}
};

const sessionSlice = createSlice({
    name:"session",
    initialState,
    reducers: {
        chnageConenctedUser(state, action){
            state.connectedUser = action.payload
        }
    }
});

export const selectConnectedUser = (state) => {
    return state.session.connectedUser;
};

export const {
    chnageConenctedUser
} = sessionSlice.actions;


export default sessionSlice.reducer;