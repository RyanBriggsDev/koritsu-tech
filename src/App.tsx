import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/layout/Nav";
import ThemeToggle from "./components/functional/ThemeToggle";

function App() {
  return (
    <>
      <Nav />
      <ThemeToggle />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
