import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminPage, Home, ItemDetails, Login } from "./pages";
import { RootState, useAppSelector } from "./store";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import brown from "@mui/material/colors/brown";
import green from "@mui/material/colors/green";
import { CssBaseline } from "@mui/material";


function App() {
  const { isLogged, isAdmin, darkTheme } = useAppSelector((state: RootState) => state.auth)


  const theme = createTheme({
    palette: {
      primary: {
        main: brown[500],

      },
      secondary: {
        main: green[300],
      },
      mode: darkTheme ? "dark" : "light",
    },
  });
  return (

    <React.Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />
          </Routes>
        }

      </ThemeProvider>
    </React.Suspense>
  )
}




export default App
