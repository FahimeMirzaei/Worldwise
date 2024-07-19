import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
};

const FAKE_USER = {
  name: "Fahime",
  email: "fahime@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      console.log(email);
    console.log(password);
    dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("The context used outside of the Provider ");
  return context;
}
export { AuthProvider, useAuth };
