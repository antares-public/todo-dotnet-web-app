import React, { useEffect, useState } from 'react';
import { ITask } from '../types';

export const Todo = () => {
  const [tasks, setTasks] = useState({ tasks: [] as ITask[], loading: true })

  const populateWeatherData = async () => {
    const response = await fetch('https://localhost:7195/api/tasks');
    const data: ITask[] = await response.json();
    setTasks({ tasks: data, loading: false });
  }

  useEffect(() => {
    populateWeatherData();
  }, [])

  return (
    <div className='table table-striped' aria-labelledby="tabelLabel">
        {tasks.loading
          ? <p>Loading...</p>
          : tasks.tasks.map((t: ITask) =>
            <div key={t._id}>
              <p>{t.name}</p>
            </div>
          )}
    </div>
  );
}
