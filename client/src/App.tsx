import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminPage } from "./pages/AdminPage";
import { Dumy } from "./pages/dumyPage";
import { Home } from "./pages/Home";
import { ItemDetails } from "./pages/ItemDetails";
import { Login } from "./pages/Login";
import { RootState, useAppSelector } from "./store";


function App() {
  const { isLogged, isAdmin } = useAppSelector((state: RootState) => state.auth)

  return (

    <React.Suspense fallback={<div>Loading...</div>}>
      {isLogged
        ? <Routes>
          <Route path="/items/:id" element={<ItemDetails />} />
          {isAdmin && <Route path="/admin" element={<AdminPage />} />}
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
        : <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      }


    </React.Suspense>
  )
}




export default App
