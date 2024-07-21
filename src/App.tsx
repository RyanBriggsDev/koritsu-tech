import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/layout/Nav";
import ThemeToggle from "./components/functional/ThemeToggle";
import BackButton from "./components/functional/BackButton";

function App() {
  return (
    <>
      <Nav />
      <ThemeToggle />
      <BackButton />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
