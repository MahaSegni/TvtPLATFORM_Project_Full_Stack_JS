import { createSlice } from "@reduxjs/toolkit";
import { queryApi } from "../../utils/queryApi";
let initialState = {
    evaluations: [],
    selectedEvaluation: {},
    errors: "",
};
const evaluationsSlice = createSlice({
    name: "evaluations",
    initialState,
    reducers: {
        populateEvaluations(state, action) {
            state.evaluations = action.payload;
        },
        selectEvaluation(state, action) {
            state.selectedEvaluation = action.payload;
        },
        unselectEvaluation(state) {
            state.selectedEvaluation = null;
        },
        deleteEvaluation: (state, action) => {
            const payload = action.payload;
            const index = state.evaluations.findIndex((item) => item._id === payload);
            if (index !== -1) {
                state.evaluations.splice(index, 1);
            }
        },
        updateEvaluation: (state, action) => {
            const payload = action.payload;
            const index = state.evaluations.findIndex(
                (item) => item._id === payload._id
            );
            if (index !== -1) {
                state.evaluations[index] = payload;
            }
        },
        addEvaluation: (state, action) => {
            const payload = action.payload;
            state.evaluations.push(payload);
        },
        setErrors(state, action) {
            state.errors = action.payload;
        },
    },
});
export const fetchEvaluations = () => async (dispatch) => {
    const [res, error] = await queryApi("evaluations");
    if (error) {
        dispatch(setErrors(error));
    } else {
        dispatch(populateEvaluations(res));
    }
};
export const selectEvaluations = (state) => {
    return [state.evaluations.evaluations, state.evaluations.errors];
};
export const selectSelectedEvaluation = (state) => {
    return state.evaluations.selectedEvaluation;
};
export const {
    populateEvaluations,
    selectEvaluation,
    unselectEvaluation,
    setErrors,
    deleteEvaluation,
    updateEvaluation,
    addEvaluation,
} = evaluationsSlice.actions;
export default evaluationsSlice.reducer;