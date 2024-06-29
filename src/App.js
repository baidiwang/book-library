import "./App.css";
import BookList from "./components/BookList";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateBook from './components/CreateBook';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BookList />,
  },
  {
    path: "create",
    element: <CreateBook />
  },
  {
    path: "edit/:id",
    element: <CreateBook />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <footer></footer>
    </div>
  );
}

export default App;
