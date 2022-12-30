import React from 'react';
import Completed from './completed/Completed';
import Tasks from './Tasks/Tasks';

const Home = () => {
    return (
        <div>
            <Tasks />
            <Completed/>
        </div>
    );
};

export default Home;