import { configureStore } from "@reduxjs/toolkit";
import addTaskModalReducer from "../features/AddTaskModal/ModalSlice";

const store = configureStore({
    reducer: {
        taskModal: addTaskModalReducer
    }
})

export default store
