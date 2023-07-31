import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/Routes";
import PaymentForm from "./shared/Components/credit-card/credit-cad";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <PaymentForm />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
