import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";
import Descricao from "./pages/descricao";
import Carrinho from "./pages/carrinho";
import NotFound from "./pages/notFound";

const router = createBrowserRouter([
  {
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/produtos/:id",
        element: <Descricao></Descricao>,
      },
      {
        path: "carrinho",
        element: <Carrinho></Carrinho>,
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
]);

export { router };
