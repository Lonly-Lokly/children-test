import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TaskState {
    taskId: string | null;
    status: string | null;
}

const initialState: TaskState = {
    taskId: null,
    status: null,
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTask(state, action: PayloadAction<{ taskId: string; status: string }>) {
            state.taskId = action.payload.taskId;
            state.status = action.payload.status;
        },
        clearTask(state) {
            state.taskId = null;
            state.status = null;
        },
    },
});

export const { setTask, clearTask } = taskSlice.actions;
export default taskSlice.reducer;
