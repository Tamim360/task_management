import { Fragment, useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../services/features/AddTaskModal/ModalSlice";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useModalFull from "../../hooks/useModalFull";
 
export default function AddTaskModal() {
  const [choosen, setChoosen] = useState('')
  const isOpen = useSelector(state => state.taskModal.isOpen)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [full] = useModalFull()

  useEffect(() => {
    !isOpen && setChoosen(false)
  },[isOpen])
  


  const date = new Date()
  const day = date.toDateString()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const time = `${hour - 12}:${minute}`
  // console.log(date);


  const imgBBapi = 'a969a4eb171cf53f375738682f6101cf'
  const imgBBurl = `https://api.imgbb.com/1/upload?key=${imgBBapi}`
 
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const title = form.title.value
    const description = form.description.value
    const photo = form.photo.files[0]

    const formData = new FormData()
    formData.append('image', photo)

    fetch(imgBBurl, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      const task = {
        email: user?.email,
        name: user?.displayName,
        title,
        description,
        photo: data.data.url,
        date
      }
      
      // add a task
      fetch("https://task-management-henna.vercel.app/tasks", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      })
      .then(res => res.json())
      .then(data => {
        navigate('/mytasks')
      })

    })

    
    // console.log(task);
  }

  return (
    <>
      <Dialog size={`${full ? 'xxl' : 'sm'}`} open={isOpen} className="px-2 pt-2 w-full dark:bg-dark-bg dark:text-white">
        <form onSubmit={(e)=> handleSubmit(e)}>
      <Input className="dark:text-white" name="title" variant="standard" label="Task Title" />
      
        <p className="my-2">{day} &nbsp; &nbsp; {hour - 12}:{minute}</p>
        
      <div className="flex items-center justify-center w-full mt-2">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className={`${choosen ? 'hidden' : ''} flex flex-col items-center justify-center pt-5 pb-6`}>
                  <svg aria-hidden="true" className="w-6 h-6 mb-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Only PNG or JPG</p>
              </div>
              <input name="photo" onChange={(e)=> setChoosen(e.target.files[0].name)} id="dropzone-file" type="file" className={`${!choosen ? 'hidden' : ''}`} />
          </label>
      </div> 


        
        <div className="mt-3">
        <Textarea className="dark:text-white" name="description" variant="outlined" label="Description" />
        </div>
        
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => dispatch(closeModal())}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button type="submit" variant="gradient" color="green" onClick={() => dispatch(closeModal())}>
            Add Task
          </Button>
           
          </DialogFooter>
          </form>
      </Dialog>
    </>
  );
}