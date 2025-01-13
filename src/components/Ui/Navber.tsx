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
          <a className="text-2xl font-bold" href="/">
            PAYGUARD
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="bg-slate-800 text-white px-4 py-1 rounded-lg mr-2 flex justify-center items-center font-semibold"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="bg-slate-800 text-white px-4 py-1 rounded-lg mr-2 flex justify-center items-center font-semibold"
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={`/dashboard/${user?.role}`}
                    className="bg-slate-800 text-white px-4 py-1 rounded-lg mr-2 flex justify-center items-center font-semibold"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => dispatch(logOut())}
                    className="bg-slate-800 text-white px-4 py-1 rounded-lg mr-2 flex justify-center items-center font-semibold"
                  >
                    Logout
                  </button>
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
