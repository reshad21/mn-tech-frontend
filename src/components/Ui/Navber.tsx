import { Link } from "react-router";
import { logOut } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Navber = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="navbar bg-base-100 px-0">
        <div className="flex-1">
          <a className="" href="/">
            Payguard
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {!user ? (
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
                  <Link to={`/dashboard/${user?.role}`}>Dashboard</Link>
                </li>
                <li>
                  <button onClick={() => dispatch(logOut())}>Logout</button>
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
