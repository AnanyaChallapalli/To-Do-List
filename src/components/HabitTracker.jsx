import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  // Load habits from localStorage on component mount
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    setHabits(savedHabits);
  }, []);

  // Save habits to localStorage whenever the habit list changes
  const saveToLocalStorage = (updatedHabits) => {
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  // Add new habit
  const handleAddHabit = () => {
    if (newHabit.trim() !== '') {
      const newHabitObject = {
        name: newHabit,
        checks: Array(7).fill(false), // Track 7 days of checkboxes
      };
      const updatedHabits = [...habits, newHabitObject];
      setHabits(updatedHabits);
      saveToLocalStorage(updatedHabits); // Save immediately after adding
      setNewHabit('');
    }
  };

  // Remove habit
  const handleRemoveHabit = (habitIndex) => {
    const updatedHabits = habits.filter((_, index) => index !== habitIndex);
    setHabits(updatedHabits);
    saveToLocalStorage(updatedHabits); // Save immediately after removing
  };

  // Toggle checkbox status
  const toggleCheckbox = (habitIndex, dayIndex) => {
    const updatedHabits = habits.map((habit, i) => {
      if (i === habitIndex) {
        const updatedChecks = habit.checks.map((checked, index) =>
          index === dayIndex ? !checked : checked
        );
        return { ...habit, checks: updatedChecks };
      }
      return habit;
    });
    setHabits(updatedHabits);
    saveToLocalStorage(updatedHabits); // Save immediately after checkbox change
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[27rem] h-auto mt-10 rounded-2xl shadow-lg bg-pink-200 p-4">
        {/* Header */}
        <div className="flex justify-between">
          <h2 className="pt-4 px-4 text-2xl font-['Poppins'] text-[#2B21A2]">
            Habit Tracker
          
          </h2>
         <Popup
            trigger={
              <button className="w-10 h-10 rounded-full bg-[#EE0064] text-2xl pb-1 mx-4 my-2 text-white">
                +
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal rounded-xl p-8 bg-white">
                <div className="flex justify-center items-center">
                  <h2 className="py-4 px-4 text-2xl font-['Poppins'] text-[#2B21A2]">
                    Add a Habit
                  </h2>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    placeholder="Type habit here"
                    value={newHabit}
                    onChange={(e) => setNewHabit(e.target.value)}
                    className="rounded-full py-2 px-4 border-2 border-[#EE0064] focus:outline-none"
                  />
                </div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    onClick={() => {
                      handleAddHabit();
                      close();
                    }}
                    className="bg-[#EE0064] text-white p-2 rounded-full"
                  >
                    Save
                  </button>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    className="bg-gray-300 p-2 rounded-full"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>

        {/* Habit List */}
        <div className="flex flex-col items-center mt-4 space-y-4">
          {habits.length > 0 ? (
            habits.map((habit, habitIndex) => (
              <div key={habitIndex} className="bg-white w-full p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h3 className="text-lg font-['Poppins'] text-[#2B21A2]">
                      {habit.name}:
                    </h3>
                    <div className="flex space-x-2 ml-4">
                      {habit.checks.map((checked, dayIndex) => (
                        <input
                          key={dayIndex}
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCheckbox(habitIndex, dayIndex)}
                          className="w-6 h-6 text-[#2B21A2] focus:ring-2 focus:ring-[#2B21A2] rounded"
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveHabit(habitIndex)}
                    className="bg-red-500 text-white p-1 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#2B21A2]">No habits added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;




