import { Checkbox, Tooltip, Typography } from "@material-tailwind/react";
import { format, parseISO } from "date-fns";
import React, { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { openEditModal } from "../../services/features/AddTaskModal/ModalSlice";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

const SingleTask = ({ task, refetch, isChecked }) => {
    const {user} = useContext(AuthContext)
    const dispatch = useDispatch()
    
    const handleComplete = (e, id) => {
        if (e.target.checked) {
            fetch(`http://localhost:5000/tasks?email=${user?.email}&status=completed&id=${id}`, {
            method: 'PUT',
        })
        .then(res => res.json())
        .then(data => {
            refetch()
            console.log(data)})
        } else {
            fetch(`http://localhost:5000/tasks?email=${user?.email}&status=incompleted&id=${id}`, {
            method: 'PUT',
        })
        .then(res => res.json())
        .then(data => {
            refetch()
            console.log(data)})
        }
    }

    const handleDelete = (id) => {
      fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'DELETE',
      })
      .then(res => res.json())
      .then(data => {
          refetch()
          // console.log(data)
          // navigate('/mytasks')
      })
  }

  
  return (
    <div
      className="relative shadow-xl m-2 p-2 border flex items-center justify-between max-w-xs dark:bg-dark-green dark:border-dark-green/80"
      key={task._id}
      >
          <div className="absolute -top-3 right-0 flex gap-2">
              {/* {
                  !isChecked && 
                <Tooltip content="Edit Task">
                    <Link onClick={()=> dispatch(openEditModal())} className="p-1 flex items-center justify-center bg-green-500 rounded-full">
                        <FaEdit className="text-white text-xs" />
                    </Link>
                </Tooltip>
              } */}
              <Tooltip content="Delete Task">
                <Link onClick={() => handleDelete(task._id)} className="p-1 flex items-center justify-center bg-red-500 rounded-full">
                    <FaTrash className="text-white text-xs" />
                </Link>
              </Tooltip>
              
          </div>
      {
        isChecked ? <Checkbox onClick={(e) => handleComplete(e, task._id)} defaultChecked /> :
        <Checkbox onClick={(e) => handleComplete(e, task._id)}  />
      }
      <div className="w-full">
        <Typography className="" variant="h6">{task.title}</Typography>
        <div className="flex items-end justify-between w-full gap-2">
          <p className="text-xs">{format(parseISO(task.date), "PP")}</p>
          <Link to={`/mytasks/${task._id}`} className="text-blue-500 text-xs">See Details</Link>
        </div>
      </div>
      {/* <EditTaskModal task={task} refetch={refetch}  /> */}
    </div>
  );
};

export default SingleTask;
