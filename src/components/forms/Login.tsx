import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, errorMessage, login] = useLogin();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <section className="bg-base-200 min-h-screen flex justify-center">
      <div className="flex flex-col items-center justify-center px-2 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-base-100 rounded-lg md:mt-0 sm:max-w-md xl:p-0 border-[0.5px] border-base-content md:min-w-[400px]">
          <div className="space-y-4 md:space-y-6 sm:p-6 p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral text-center mb-8">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-neutral"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-secondary border border-secondary text-neutral sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={handleEmailChange} // Add a comma here
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-neutral"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-secondary border border-secondary text-neutral sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
              <p className="text-sm font-light text-neutral">
                Don't have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
