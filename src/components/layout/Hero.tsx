import Button from "../small/Button";
import { useAuth } from "../../contexts/AuthContext";

function Hero() {
  const { state } = useAuth();
  return (
    <div className="hero items-center bg-[url('https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp')] min-h-screen">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content w-full justify-start max-w-[1440px] justify-self-start text-neutral-content">
        <div className="max-w-md bg-neutral rounded-xl p-5">
          <h1 className="mb-5 text-5xl font-bold">Koritsu</h1>
          <p className="mb-5">
            Providing a centralised information repository for teams and organisations.
          </p>
          <div className="flex gap-2">

            {state.isAuthenticated ? (
              <Button to="/account" className="btn btn-primary">
                View your Dashboard
              </Button>
            ) : (
              <>
                <Button to="/account/login" className="btn btn-primary">
                  Login
                </Button>
                <Button to="/account/sign-up" className="btn btn-secondary">
                  Create an Account
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
