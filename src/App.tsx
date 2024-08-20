import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import CarrinhoProvider from "./contexts//CarrinhoContext";

function App() {
  return (
    <CarrinhoProvider>
      <RouterProvider router={router}></RouterProvider>;
    </CarrinhoProvider>
  );
}

export default App;
