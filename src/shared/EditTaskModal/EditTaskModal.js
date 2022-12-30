import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditModal } from "../../services/features/AddTaskModal/ModalSlice";
import { useNavigate } from "react-router-dom";
import useModalFull from "../../hooks/useModalFull";
 
export default function EditTaskModal({task, refetch}) {
  const [open, setOpen] = useState(false);
  const isOpen = useSelector(state => state.taskModal.editModalOpen)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [full] = useModalFull()
 
    // console.log(task);
//   const handleOpen = () => setOpen(!open);
 
    const handleEdit = (e, id) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const description = form.description.value

        const task = {
            title: title,
            description: description
        }

        fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                form.reset()
                dispatch(closeEditModal())
                navigate('/mytasks')
                refetch && refetch()
            }
        })
    }
    
  return (
    <Fragment>
      <Dialog size={`${full ? 'xxl' : 'sm'}`} open={isOpen} className="px-2 pt-2 w-full dark:bg-dark-green">
        <form onSubmit={(e) => handleEdit(e, task._id)} >
        <Input className="dark:text-white" name="title" variant="standard" defaultValue={task.title} label="Task Title" />
        <div className="mt-3">
        <Textarea className="dark:text-white" name="description" variant="outlined" defaultValue={task.description} label="Description" />
        </div>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={()=> dispatch(closeEditModal())}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button type="submit" variant="gradient" color="green" >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </Fragment>
  );
}