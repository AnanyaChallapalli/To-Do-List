

import React, { useState } from 'react';

const AddItem = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('low'); // Default to 'low'

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim()) {
      onAddTask({ task: task.trim(), priority });
      setTask('');
      setPriority('low');
    } else {
      console.error('Please add a task');
    }
  };

  return (
    <div>
      <div className="w-[27rem] h-[18rem] mt-10 rounded-2xl shadow-solid-pink bg-pink-200">
        <textarea
          rows="4"
          value={task}
          onChange={handleInputChange}
          placeholder="Type Here"
          className="p-4 w-[26rem] bg-pink-200 rounded-2xl h-[10rem] placeholder-indigo-700 placeholder-xl m-2"
        ></textarea>
      </div>
      <div className="flex justify-center items-center mt-[-7rem]">
        <label className="relative flex items-center cursor-pointer px-2">
          <input
            type="radio"
            name="priority"
            value="high"
            checked={priority === 'high'}
            onChange={handlePriorityChange}
            className="sr-only peer"
          />
          <div className="w-40 h-10 border-2 border-[#EE0064] text-[#EE0064] font-bold rounded-full flex justify-center items-center peer-checked:bg-[#EE0064] peer-checked:text-white">
            High Priority
          </div>
        </label>

        <label className="relative flex items-center cursor-pointer px-2">
          <input
            type="radio"
            name="priority"
            value="low"
            checked={priority === 'low'}
            onChange={handlePriorityChange}
            className="sr-only peer"
          />
          <div className="w-40 h-10 border-2 border-[#EE0064] text-[#EE0064] font-bold rounded-full flex justify-center items-center peer-checked:bg-[#EE0064] peer-checked:text-white">
            Low Priority
          </div>
        </label>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="m-4 bg-indigo-700 p-2 w-80 rounded-full text-white"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddItem;
