import React from "react"
import { Routes, Route } from 'react-router-dom';
import { AdminPage } from "./pages/AdminPage";
import { Dumy } from "./pages/dumyPage";
import { ItemDetails } from "./pages/ItemDetails";
import { Login } from "./pages/Login";
import { RootState, useAppSelector } from "./store";


function App() {
  const { isLogged } = useAppSelector((state: RootState) => state.auth)

  return (

    <React.Suspense fallback={<div>Loading...</div>}>
      {isLogged
        ? <Routes>
          <Route path="/items/[id]" element={<ItemDetails id={54} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        : <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      }


    </React.Suspense>
  )
}




export default App
