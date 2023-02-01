import "./App.css";
import "./pages/formRegister/formRegister.tsx";
import { FormRegister } from "./pages/formRegister/formRegister";
import { FormForgotPassword } from "./pages/forgot-password/form-forgotpassword";
import { FormLogin } from "./pages/formLogin/formLogin";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FormForgotPassword />
        <FormRegister />
        <FormLogin />
      </header>
    </div>
  );
}

export default App;
