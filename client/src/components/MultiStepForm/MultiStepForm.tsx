import { useEffect, useState } from "react";
import Step1_Profile from "./Step1_Profile";
import Step2_Skills from "./Step2_Skills";
import Step3_SocialLinks from "./Step3_SocialLinks";
import Step4_Projects from "./Step4_Projects";
import Step5_Confirm from "./Step5_Confirm";
import { User, Cog, Globe, Kanban, UserCheck } from "lucide-react";
import { type FormState } from "@/types/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import type { ProjectType } from "@/types/form";

type Props = {
  state: FormState;
  //Profile
  dispatch: React.Dispatch<any>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleIconClick: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //Skill
  skillInputRef: React.RefObject<HTMLInputElement | null>;
  addSkill: (skillInput: string) => void;
  removeSkill: (skillToRemove: string) => void;
  //Social
  addSocial: () => void;
  removeSocial: (socialPlatform: string) => void;
  social: string | undefined;
  setSocial: React.Dispatch<React.SetStateAction<string | undefined>>;
  url: string | undefined;
  setUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  //Project
  newProject: ProjectType;
  setNewProject: React.Dispatch<React.SetStateAction<ProjectType>>;
  techStackInput: string;
  setTechStackInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddTechStack: () => void;
  projectIndex: number | null;
  handleProjectClick: (project: ProjectType, index: number) => void;
  handleRemoveTechStack: (stackToRemove: string) => void;
  handleAddProject: () => void;
};

function MultiStepForm({
  state,
  dispatch,
  fileInputRef,
  handleIconClick,
  handleImageUpload,
  skillInputRef,
  addSkill,
  removeSkill,
  addSocial,
  removeSocial,
  social,
  setSocial,
  url,
  setUrl,
  newProject,
  setNewProject,
  techStackInput,
  setTechStackInput,
  handleAddTechStack,
  projectIndex,
  handleProjectClick,
  handleRemoveTechStack,
  handleAddProject,
}: Props) {
  const savedStep = sessionStorage.getItem("currentStep");
  const [step, setStep] = useState(savedStep ? parseInt(savedStep) : 0);

  useEffect(() => {
    sessionStorage.setItem("currentStep", step.toString());
  }, [step]);

  const onNext = () => {
    if (step < 4) setStep((prevStep) => prevStep + 1);
  };

  const onBack = () => {
    if (step > 0) setStep((prevStep) => prevStep - 1);
  };

  const handleStepClick = (stepIndex: number) => {
    setStep(stepIndex);
  };

  const steps = [
    {
      icon: <User className="h-4 w-4" />,
      name: "Profile",
      component: (
        <Step1_Profile
          handleImageUpload={handleImageUpload}
          state={state}
          dispatch={dispatch}
          fileInputRef={fileInputRef}
          handleIconClick={handleIconClick}
          onNext={onNext}
        />
      ),
    },
    {
      icon: <Cog className="h-4 w-4" />,
      name: "Skills",
      component: (
        <Step2_Skills
          state={state}
          dispatch={dispatch}
          skillInputRef={skillInputRef}
          addSkill={addSkill}
          removeSkill={removeSkill}
          onNext={onNext}
          onBack={onBack}
        />
      ),
    },
    {
      icon: <Globe className="h-4 w-4" />,
      name: "Social Links",
      component: (
        <Step3_SocialLinks
          state={state}
          dispatch={dispatch}
          addSocial={addSocial}
          removeSocial={removeSocial}
          social={social}
          setSocial={setSocial}
          url={url}
          setUrl={setUrl}
          onNext={onNext}
          onBack={onBack}
        />
      ),
    },
    {
      icon: <Kanban className="h-4 w-4" />,
      name: "Projects",
      component: (
        <Step4_Projects
          state={state}
          dispatch={dispatch}
          newProject={newProject}
          setNewProject={setNewProject}
          techStackInput={techStackInput}
          setTechStackInput={setTechStackInput}
          handleAddTechStack={handleAddTechStack}
          projectIndex={projectIndex}
          handleProjectClick={handleProjectClick}
          handleRemoveTechStack={handleRemoveTechStack}
          handleAddProject={handleAddProject}
          onNext={onNext}
          onBack={onBack}
        />
      ),
    },
    {
      icon: <UserCheck className="h-4 w-4" />,
      name: "Confirm",
      component: <Step5_Confirm onNext={onNext} onBack={onBack} />,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-6 bg-white space-y-4 shadow rounded w-full max-w-2xl mx-auto">
        {/* Step Navigation */}
        <div className="flex justify-evenly shadow-2xs items-center rounded-2xl border p-2">
          {steps.map((stepData, index) => (
            <div
              className={`space-x-4 justify-between items-center ${
                index === step ? "flex" : "hidden sm:flex"
              }`}
              key={index}
            >
              <div
                className="cursor-pointer"
                onClick={() => handleStepClick(index)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    {React.cloneElement(stepData.icon, {
                      className: `${
                        index === step
                          ? "w-8 h-8 p-1 shadow-xs shadow-[#8F87F1] transition-all duration-300 ease-in-out text-white rounded-full bg-[#8B5DFF]"
                          : "h-6 w-6 hover:bg-gray-100 rounded-full text-gray-500 bg-none transition-all duration-300 ease-in-out"
                      }`,
                    })}
                  </TooltipTrigger>
                  <TooltipContent>{stepData.name}</TooltipContent>
                </Tooltip>
              </div>

              {index === step && (
                <div className="flex flex-col">
                  <span className="text-xs text-[#8B5DFF] font-semibold">
                    Step {index + 1}/5
                  </span>
                  <span className="text-md font-medium"> {stepData.name}</span>
                </div>
              )}
              {index < steps.length - 1 && (
                <div className="h-5 hidden sm:block border-l-1 border-gray-300 mx-8" />
              )}
            </div>
          ))}
        </div>

        {/* Step Components */}
        <div>{steps[step].component}</div>
      </div>
    </div>
  );
}

export default MultiStepForm;
