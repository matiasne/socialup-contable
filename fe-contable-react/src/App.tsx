import "./App.css";

import { AppRouter } from "./Routes";
import { BrowserRouter } from "react-router-dom";
import ItemClient from "./features/Clients/components/ItemClient/itemClient";

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
