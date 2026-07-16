import React from 'react'
import Navbar from "./common_comp/Navbar"
function App() {
  return (
    <>
        <Navbar/>
     <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-blue-600">
        Tailwind CSS is working!
      </h1>
    </div>
    </>
  )
}

export default App