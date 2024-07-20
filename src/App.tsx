import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/layout/Nav";

function App() {
  return (
    <>
      <Nav />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
