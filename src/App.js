import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider";
import AppRouter from "./router/AppRouter";
import MovieProvider from "./context/MovieProvider";

function App() {
  return (
    <div className="dark:bg-gray-dark-main min-h-screen">
      <AuthProvider>
        <MovieProvider>
          <AppRouter />
          <ToastContainer />
        </MovieProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
