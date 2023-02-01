import "./App.css";
import "./pages/formRegister/formRegister.tsx";
import { AppRouter } from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
