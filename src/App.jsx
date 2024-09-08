import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './components/TodoList'
import Header from './components/Header'
import HabitTracker from './components/HabitTracker'
import AddItem from './components/AddItem'

function App() {

  
  return (
    <div>
      <section className="flex">
      <div>
      <Header/>
      <TodoList />
      </div>
      <div>
     
    
      </div>
      </section>
    </div>
    
  )
}

export default App
