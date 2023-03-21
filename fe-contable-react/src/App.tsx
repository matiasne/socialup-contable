import "./App.css";
import "./pages/formRegister/formRegister.tsx";
import { AppRouter } from "./Routes";
import { BrowserRouter } from "react-router-dom";
import FormBusiness from "./pages/formBusiness/formBusiness";

function App() {
  return (
    <div className="App">
      <FormBusiness />
    </div>
  );
}

export default App;
