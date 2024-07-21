import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log({ name, email, password });
  };

  return (
    <section className="bg-base-200 min-h-screen flex justify-center">
      <div className="flex flex-col items-center justify-center px-2 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-base-100 rounded-lg md:mt-0 sm:max-w-md xl:p-0 border-[0.5px] border-base-content md:min-w-[400px]">
          <div className="space-y-4 md:space-y-6 sm:p-6 p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral text-center mb-8">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-neutral"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-secondary border border-secondary text-neutral sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
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
                  onChange={handleEmailChange}
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
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-neutral"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-secondary border border-secondary text-neutral sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-neutral">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
