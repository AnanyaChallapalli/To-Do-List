import React, { useState, useEffect, useCallback } from 'react';
import AddItem from './AddItem';
import HabitTracker from './HabitTracker';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadTasks = useCallback(() => {
    try {
      const savedTasksString = localStorage.getItem('tasks');
      console.log('Raw saved tasks:', savedTasksString);
      const savedTasks = savedTasksString ? JSON.parse(savedTasksString) : [];
      console.log('Parsed saved tasks:', savedTasks);
      setTasks(savedTasks);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    const saveTasks = () => {
      if (isLoaded) {
        try {
          console.log('Saving tasks:', tasks);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          console.log('Tasks saved successfully');
          // Verify the save operation
          const savedTasksString = localStorage.getItem('tasks');
          console.log('Verified saved tasks:', savedTasksString);
        } catch (error) {
          console.error('Error saving tasks:', error);
        }
      }
    };

    saveTasks();
  }, [tasks, isLoaded]);

  const handleAddTask = (newTask) => {
    console.log('Adding new task:', newTask);
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, { ...newTask, completed: false }];
      console.log('Updated tasks:', updatedTasks);
      return updatedTasks;
    });
  };

  const handleRemoveTask = (index) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index) => {
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const highPriorityTasks = tasks.filter(task => task.priority === 'high');
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low');

  return (
    <div className='mx-20 mt-10 flex'>
      <div className='rounded-2xl shadow-solid-pink bg-pink-200 w-[54rem] min-h-[32rem] p-4'>
        {/* High Priority Section */}
        <div className='min-h-[16rem]'>
          <h2 className="pt-4 px-4 text-2xl font-['Poppins'] text-[#2B21A2]">High Priority</h2>
          {highPriorityTasks.length > 0 ? (
            highPriorityTasks.map((task, index) => (
              <div key={index} className="flex items-center p-2 bg-red-100 rounded-lg my-2 mx-4 shadow">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(tasks.indexOf(task))}
                  className="mr-2"
                />
                <p className={`flex-1 ${task.completed ? 'line-through' : ''}`}>{task.task}</p>
                <button
                  onClick={() => handleRemoveTask(tasks.indexOf(task))}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
                </button>
              </div>
            ))
          ) : (
            <p className="px-4 text-[#2B21A2]">No high priority tasks yet</p>
          )}
        </div>

        {/* Low Priority Section */}
        <div className='min-h-[16rem] mt-8'>
          <h2 className="pt-4 px-4 text-2xl font-['Poppins'] text-[#2B21A2]">Low Priority</h2>
          {lowPriorityTasks.length > 0 ? (
            lowPriorityTasks.map((task, index) => (
              <div key={index} className="flex items-center p-2 bg-green-100 rounded-lg my-2 mx-4 shadow">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(tasks.indexOf(task))}
                  className="mr-2"
                />
                <p className={`flex-1 ${task.completed ? 'line-through' : ''}`}>{task.task}</p>
                <button
                  onClick={() => handleRemoveTask(tasks.indexOf(task))}
                  className="bg-green-500 text-white p-1 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
                </button>
              </div>
            ))
          ) : (
            <p className="px-4 text-[#2B21A2]">No low priority tasks yet</p>
          )}
        </div>
      </div>
      <div className='mx-10 mt-[-40px]'>
        <AddItem onAddTask={handleAddTask}> </AddItem>
        <HabitTracker className></HabitTracker>
      </div>
    </div>
  );
};

export default TodoList;
