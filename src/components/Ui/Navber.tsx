import { useState } from "react";
import { Link } from "react-router";

const Navber = () => {
  const [user, setUser] = useState(false);
  const role = "admin";
  return (
    <>
      <div className="navbar bg-base-100 px-0">
        <div className="flex-1">
          <a className="" href="/" onClick={() => setUser(!user)}>
            Payguard
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={`/dashboard/${role}`}>Dashboard</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navber;
