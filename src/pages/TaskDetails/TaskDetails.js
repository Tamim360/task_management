import { Tooltip, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import React, { useContext } from 'react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { openEditModal } from '../../services/features/AddTaskModal/ModalSlice';
import EditTaskModal from '../../shared/EditTaskModal/EditTaskModal';

const TaskDetails = () => {
    const { user } = useContext(AuthContext)
    const task = useLoaderData()
    // console.log(task);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const location = useLocation()
    // const id = location?.state?.id
    // console.log(id);


    // const { data: task , isLoading, refetch } = useQuery({
    //     queryKey: ["tasks", id],
    //     queryFn: async () => {
    //         const res = await fetch(`https://task-management-henna.vercel.app/tasks/${id}`)
    //         const data = await res.json()
    //         return data
    //     }
    // })

    // console.log(task);

    const handleComplete = (id) => {
        
        fetch(`https://task-management-henna.vercel.app/tasks?email=${user?.email}&status=incompleted&id=${id}`, {
            method: 'PUT',
        })
        .then(res => res.json())
        .then(data => {
            // refetch()
            console.log(data)
            navigate('/mytasks')
        })
        }
    
    
    const handleDelete = (id) => {
        fetch(`https://task-management-henna.vercel.app/tasks/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            // refetch()
            console.log(data)
            navigate('/mytasks')
        })
    }

    return (
        <div className="max-w-3xl mx-auto mt-6">
            <div className="flex items-center justify-between w-full gap-2 mb-3">
            <p className="text-sm font-semibold">{format(parseISO(task.date), "PPpp")}</p>
            <div className="flex gap-2">
              {
                task.status === 'completed' ?   
                
                <Tooltip content="Click to make incomplete">
                    <Link onClick={() => handleComplete(task._id)} className="flex items-center gap-1 text-sm"> <FaCheck className="text-blue-500" /> completed</Link>
                </Tooltip>
                :
                <Tooltip content="Edit Task">
                    <Link onClick={() => dispatch(openEditModal())} className="p-1 flex items-center justify-center bg-green-500 rounded-full">
                        <FaEdit className="text-white text-xs" />
                    </Link>
                </Tooltip>
              }
              <Tooltip content="Delete Task">
                <Link onClick={() => handleDelete(task._id)} className="p-1 flex items-center justify-center bg-red-500 rounded-full">
                    <FaTrash className="text-white text-xs" />
                </Link>
              </Tooltip>
              
          </div>
          
            </div>
            <Typography variant="h4">
                {task.title}
            </Typography>
            <Typography className="my-3" variant="paragraph">
                {task.description}
            </Typography>
            <img src={task.photo} className="w-full" alt="" />
            <EditTaskModal task={task} />
        </div>
    );
};

export default TaskDetails;