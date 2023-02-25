import React from "react"
import { Routes, Route } from 'react-router-dom';
import { Dumy } from "./pages/dumyPage";


function App() {

  return (

    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Dumy text="login" />} />
        <Route path="/listItems" element={<Dumy text="listItems" />} />
        <Route path="*" element={<Dumy text="ever" />} />
      </Routes>
    </React.Suspense>
  )
}




export default App
