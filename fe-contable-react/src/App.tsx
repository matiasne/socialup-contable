import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/Routes";

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
