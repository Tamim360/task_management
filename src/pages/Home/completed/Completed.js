import { Checkbox, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import SingleTask from '../../../shared/SingleTask/SingleTask';

const Completed = () => {
    const { user } = useContext(AuthContext)
    
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await fetch(`https://task-management-henna.vercel.app/tasks?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    const completedTasks = tasks.filter(task => task.status === 'completed')

    const handleComplete = (e, id) => {
        // console.log(e.target.checked);
        // console.log(id);
        if (!e.target.checked) {
            fetch(`https://task-management-henna.vercel.app/tasks?email=${user?.email}&status=incompleted&id=${id}`, {
            method: 'PUT',
        })
        .then(res => res.json())
        .then(data => {
            refetch()
            console.log(data)})
        } 
    }

    return (
        <div className="my-6">
            <Typography className="mb-2 border-b" variant="h4">
                Completed Tasks
            </Typography>
            <div className='flex flex-wrap justify-center items-start sm:justify-start'>
                {isLoading && <p>Loading...</p>}
                {
                    completedTasks.slice(0, 5).map((task) => (
                        <SingleTask task={task} refetch={refetch} key={task._id} isChecked="checked" />
                    ))
                }
            </div>
        </div>
    );
};

export default Completed;