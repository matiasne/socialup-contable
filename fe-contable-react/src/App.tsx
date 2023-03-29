import "./App.css";
import "./pages/formRegister/formRegister.tsx";
import { AppRouter } from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
