import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="dark:bg-gray-dark-main min-h-screen">
      <AuthProvider>
        <AppRouter />
        <ToastContainer/>
      </AuthProvider>
    </div>
  );
}

export default App;
