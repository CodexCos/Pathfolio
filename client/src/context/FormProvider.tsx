import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialState, type FormState, type Action } from "@/types/form";


function formReducer(state: FormState, action: Action) {
  switch (action.type) {
    case "ADD_PROFILE":
      return {
        ...state,
        profileImage: action.payload.profileImage,
        username: action.payload.username,
        bio: action.payload.bio,
      };
    case "ADD_SKILLS":
      return {
        ...state,
        skills: action.payload.skills,
        education: action.payload.education,
        experience: action.payload.experience,
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contact: {
          gmail: action.payload.gmail,
          number: action.payload.number,
        },
      };
    case "ADD_SOCIAL":
      return {
        ...state,
        socialLinks: {
          ...state.socialLinks,
          ...action.payload,
        },
      };
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project, index) =>
          index === action.payload.index
            ? action.payload.updatedProject
            : project
        ),
      };
    case "REMOVE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((_, i) => i !== action.payload),
      };
    case "SET_PORTFOLIO_DATA":
      return {
        ...state,
        profileImage: action.payload.profileImage,
        username: action.payload.username,
        bio: action.payload.bio,
        skills: action.payload.skills,
        experience: action.payload.experience,
        education: action.payload.education,
        socialLinks: action.payload.socialLinks,
        contact:action.payload.contact,
        projects: action.payload.projects,
      };
    default:
      return state;
  }
}

type FormContextType = {
  state: FormState;
  dispatch: React.Dispatch<Action>;
  portfolio: FormState | null;
  setPortfolio: React.Dispatch<React.SetStateAction<FormState | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

function FormProvider({ children }: { children: React.ReactNode }) {
  const savedState = sessionStorage.getItem("formState");
  const parsedState = savedState ? JSON.parse(savedState) : initialState;
  const [state, dispatch] = useReducer(formReducer, parsedState);
  const [portfolio, setPortfolio] = useState<FormState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    sessionStorage.setItem("formState", JSON.stringify(state));
  }, [state]);

  return (
    <FormContext.Provider
      value={{
        state,
        dispatch,
        portfolio,
        setPortfolio,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("userFormContext must be used inside a FormProvider");
  }
  return context;
};

export default FormProvider;
