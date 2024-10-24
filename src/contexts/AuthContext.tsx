import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: number;
    username: string;
    email: string;
    birth_date: null;
    is_staff: boolean;
    is_active: boolean;
  } | null;
}

type AuthAction =
  | {
      type: "SET_USER";
      payload: { user: AuthState["user"] };
    }
  | {
      type: "SET_TOKENS";
      payload: {
        accessToken: string;
        refreshToken: string;
        user: AuthState["user"];
      };
    }
  | { type: "CLEAR_TOKENS" };

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "SET_TOKENS":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      };
    case "CLEAR_TOKENS":
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
