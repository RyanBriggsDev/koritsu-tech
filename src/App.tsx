import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/layout/Nav";
import ThemeToggle from "./components/functional/ThemeToggle";
import BackButton from "./components/functional/BackButton";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Nav />
      <ThemeToggle />
      <BackButton />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
