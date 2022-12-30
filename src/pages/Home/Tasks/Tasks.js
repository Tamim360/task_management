import { Button, Checkbox, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns/esm';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import SingleTask from '../../../shared/SingleTask/SingleTask';

const Tasks = () => {
    const { user } = useContext(AuthContext)
    
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/tasks?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    const incompletedTasks = tasks.filter(task => !task.status || task.status === 'incompleted')

    const handleComplete = (e, id) => {
        // console.log(e.target.checked);
        // console.log(id);
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

    return (
        <div className="my-3">
            <Typography className="mb-2 border-b" variant="h4">
                Your Tasks {incompletedTasks.length}
            </Typography>
            <div className='flex flex-wrap justify-center items-start sm:justify-start'>
            {isLoading && <p>Loading...</p>}
                {
                    incompletedTasks.slice(0, 5).map((task) => (
                        <SingleTask task={task} refetch={refetch} key={task._id} />
                    ))
                }
            </div>
        </div>
    );
};

export default Tasks;