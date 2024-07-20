import React from "react";

function Hero() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Koritsu.tech</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <button className="btn btn-primary">Login</button>
            <button className="btn btn-secondary">Create an Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
