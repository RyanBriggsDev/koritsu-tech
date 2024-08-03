import Button from "../small/Button";
import { useAuth } from "../../contexts/AuthContext";

function Hero() {
  const { state } = useAuth();
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Koritsu.tech</h1>
          <p className="py-6 max-w-1/2">
            The Heartbeat of High-Performing Agencies. Unifying Clients, Teams,
            and Workflows. Powering Growth Through Seamless Integration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
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
