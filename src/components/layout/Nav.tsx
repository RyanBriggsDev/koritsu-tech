import { NavLink } from "react-router-dom";
import NavAccountIcon from "../account/NavAccountIcon";
import NavHamburger from "./NavHamburger";

type Props = {};

function Nav({}: Props) {
  return (
    <>
      <div className="navbar fixed top-0 left-0 right-0 bg-base-100 z-50">
        <div className="navbar-start">
          <NavHamburger />
        </div>
        <div className="navbar-center">
          <NavLink className="btn btn-ghost text-xl cursor-pointer" to="/">
            Koritsu.tech
          </NavLink>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          <NavAccountIcon />
        </div>
      </div>
    </>
  );
}

export default Nav;
