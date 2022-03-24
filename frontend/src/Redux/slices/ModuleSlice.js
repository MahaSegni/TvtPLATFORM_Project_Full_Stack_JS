import { createSlice } from "@reduxjs/toolkit";
import { queryApi } from "../../utils/queryApi";
let initialState = {
    modules: [],
    selectedModule: {},
    errors: "",
};
const ModuleSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        populatemodules(state, action) {
            state.modules = action.payload;
        },
        selectModule(state, action) {
            state.selectedModule = action.payload;
        },
        unselectModule(state) {
            state.selectedModule = null;
        },
        deleteModule: (state, action) => {
            const payload = action.payload;
            const index = state.modules.findIndex((item) => item._id === payload);
            if (index !== -1) {
                state.modules.splice(index, 1);
            }
        },
        updateModule: (state, action) => {
            const payload = action.payload;
            const index = state.modules.findIndex(
                (item) => item._id === payload._id
            );
            if (index !== -1) {
                state.modules[index] = payload;
            }
        },
        addModule: (state, action) => {
            const payload = action.payload;
            state.modules.push(payload);
        },
        setErrors(state, action) {
            state.errors = action.payload;
        },
    },
});
export const fetchmodules = () => async (dispatch) => {
    const [res, error] = await queryApi("modules");
    if (error) {
        dispatch(setErrors(error));
    } else {
        dispatch(populatemodules(res));
    }
};
export const selectmodules = (state) => {
    return [state.modules.modules, state.modules.errors];
};
export const selectSelectedModule = (state) => {
    return state.modules.selectedModule;
};
export const {
    populatemodules,
    selectModule,
    unselectModule,
    setErrors,
    deleteModule,
    updateModule,
    addModule,
} = modulesSlice.actions;
export default ModuleSlice.reducer;