import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "taskModal",
    initialState: {
        isOpen: false,
        editModalOpen: false,
    },
    reducers: {
        openModal: (state) => {state.isOpen = true},
        closeModal: (state) => {state.isOpen = false},
        openEditModal: (state) => {state.editModalOpen = true},
        closeEditModal: (state) => {state.editModalOpen = false},
    }
})

export const { openModal, closeModal, openEditModal, closeEditModal } = modalSlice.actions

export default modalSlice.reducer