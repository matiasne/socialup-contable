import "./App.css";
import "./pages/formRegister/formRegister.tsx";
import { AppRouter } from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { Avatar } from "@mui/material";
import AvatarWithInput from "./shared/Components/avatar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <AppRouter />
          <AvatarWithInput />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
