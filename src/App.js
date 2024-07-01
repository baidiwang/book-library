import "./App.css";
import BookList from "./components/BookList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateBook from "./components/CreateBook";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <BookList />,
  },
  {
    path: "create",
    element: <CreateBook />,
  },
  {
    path: "edit/:id",
    element: <CreateBook />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RouterProvider router={router} />
        <footer></footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
