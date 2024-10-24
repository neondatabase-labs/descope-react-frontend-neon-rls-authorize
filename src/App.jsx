import { useCallback } from "react";
import {
  useDescope,
  useSession,
  useUser,
  Descope,
  getSessionToken,
} from "@descope/react-sdk";
import TodoApp from "./Todo";

const App = () => {
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user, isUserLoading } = useUser();
  const { logout } = useDescope();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <>
      {!isAuthenticated && (
        <Descope
          flowId="sign-up-or-in"
          onSuccess={(e) => console.log(e.detail.user)}
          onError={(e) => console.log("Could not log in!")}
        />
      )}

      {(isSessionLoading || isUserLoading) && <p>Loading...</p>}

      {!isUserLoading && isAuthenticated && (
        <>
          <nav>
            <h1>Descope + Neon Authorize Demo</h1>
            <div className="logout">
              <p>Hello {user.name}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </nav>
          <TodoApp />
        </>
      )}
    </>
  );
};

export default App;
