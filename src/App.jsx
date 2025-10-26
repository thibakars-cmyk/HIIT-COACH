import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './screens/Home'
import Profile from './screens/Profile'
import Workouts from './screens/Workouts'
import Tracker from './screens/Tracker'
import Groups from './screens/Groups'
import Leaderboard from './screens/Leaderboard'

export default function App(){
  return (
    <div className="app">
      <header className="topbar">
        <h1>HIIT Coach</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/tracker">Tracker</Link>
          <Link to="/groups">Groups</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/workouts" element={<Workouts/>} />
          <Route path="/tracker" element={<Tracker/>} />
          <Route path="/groups" element={<Groups/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
      </main>
    </div>
  )
}
