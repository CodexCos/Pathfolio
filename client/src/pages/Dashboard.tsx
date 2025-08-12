import React, { useState, useEffect, useRef } from "react";
import MultiStepForm from "@/components/MultiStepForm/MultiStepForm";
import axiosInstance from "@/lib/axios";
import Profile from "@/components/DashboardForm/Profile";
import Skill from "@/components/DashboardForm/Skill";
import Social from "@/components/DashboardForm/Social";
import Project from "@/components/DashboardForm/Project";
import { Link, Loader } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/context/FormProvider";
import { type ProjectType } from "@/types/form";

function Dashboard() {
  const { portfolio, setPortfolio, setIsLoading, isLoading, state, dispatch } =
    useFormContext();

  // Profile
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageLoading, setImageLoading] = useState(true);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageLoading = () => {
    setImageLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result as string;
      dispatch({
        type: "ADD_PROFILE",
        payload: {
          profileImage: base64Image,
          username: state.username,
          bio: state.bio,
        },
      });
    };
  };

  // Skill
  const skillInputRef = useRef<HTMLInputElement>(null);

  const addSkill = (skillInput: string) => {
    if (skillInput.trim() && !state.skills.includes(skillInput.trim())) {
      dispatch({
        type: "ADD_SKILLS",
        payload: {
          skills: [...state.skills, skillInput.trim()],
          education: state.education,
          experience: state.experience,
        },
      });
      if (skillInputRef.current) {
        skillInputRef.current.value = "";
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    dispatch({
      type: "ADD_SKILLS",
      payload: {
        skills: state.skills.filter((skill) => skill !== skillToRemove),
        education: state.education,
        experience: state.experience,
      },
    });
  };

  // Social
  const [social, setSocial] = useState<string | undefined>("");
  const [url, setUrl] = useState<string | undefined>("");

  const validateUrl = (platform: string, url: string) => {
    const patterns: { [key: string]: RegExp } = {
      github: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+(?:\/.*)?$/,
      linkedin:
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+(?:\/.*)?$/,
      twitter:
        /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+(?:\/.*)?$/,
      instagram: /^(https?:\/\/)?www\.instagram\.com\/[a-zA-Z0-9_]+(?:\/.*)?$/,
      facebook: /^(https?:\/\/)?www\.facebook\.com\/[a-zA-Z0-9.]+(?:\/.*)?$/,
      website: /^(https?:\/\/)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-]+)+$/,
    };

    const pattern = patterns[platform.toLowerCase()];
    if (!pattern) {
      return false;
    }

    return pattern.test(url);
  };

  const addSocial = () => {
    if (social && url) {
      if (!validateUrl(social, url)) {
        toast.error(`Please enter a valid ${social} URL.`);
        return;
      }
      dispatch({
        type: "ADD_SOCIAL",
        payload: {
          ...state.socialLinks,
          [social]: url,
        },
      });
      setSocial("");
      setUrl("");
    }
  };

  const removeSocial = (socialPlatform: string) => {
    dispatch({
      type: "ADD_SOCIAL",
      payload: {
        ...state.socialLinks,
        [socialPlatform]: "",
      },
    });
  };

  // Project Section
  const [newProject, setNewProject] = useState<ProjectType>({
    title: "",
    description: "",
    techStack: [],
    githubLink: "",
    liveLink: "",
  });

  console.log(state.projects);

  const isValidGithubURL = (url: string) => {
    const regex =
      /^(https?:\/\/)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/i;
    return regex.test(url);
  };

  const isValidURL = (url: string) => {
    const regex = /^(https?:\/\/)?([a-z0-9]+(\.[a-z0-9]+)+)(\/.*)?$/i;
    return regex.test(url);
  };

  const [techStackInput, setTechStackInput] = useState("");

  const handleAddTechStack = () => {
    if (techStackInput && !newProject.techStack.includes(techStackInput)) {
      setNewProject({
        ...newProject,
        techStack: [...newProject.techStack, techStackInput],
      });
      setTechStackInput("");
    }
  };

  const [projectIndex, setProjectIndex] = useState<number | null>(null);

  const handleProjectClick = (project: ProjectType, index: number) => {
    setNewProject(project);
    setProjectIndex(index);
  };

  console.log(projectIndex);

  const handleRemoveTechStack = (stackToRemove: string) => {
    setNewProject({
      ...newProject,
      techStack: newProject.techStack.filter(
        (stack) => stack !== stackToRemove
      ),
    });
  };

  const handleAddProject = () => {
    if (
      newProject.title &&
      newProject.description &&
      newProject.githubLink &&
      newProject.techStack &&
      newProject.liveLink
    ) {
      if (!isValidGithubURL(newProject.githubLink)) {
        toast.error("Please enter a valid GitHub URL.");
        return;
      }

      if (!isValidURL(newProject.liveLink)) {
        toast.error("Please enter a valid live project URL.");
        return;
      }

      if (projectIndex === null) {
        dispatch({
          type: "ADD_PROJECT",
          payload: newProject,
        });
        toast.success("Project added!");
      } else {
        dispatch({
          type: "UPDATE_PROJECT",
          payload: {
            index: projectIndex,
            updatedProject: newProject,
          },
        });
        toast.success("Project updated!");
      }
      setNewProject({
        title: "",
        description: "",
        techStack: [],
        githubLink: "",
        liveLink: "",
      });
      setProjectIndex(null);
    } else {
      toast.error("Please fill out all fields.");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchPortfolio = async () => {
      try {
        const response = await axiosInstance.get("/portfolio/");
        console.log("Portfolio Data:", response.data);
        setPortfolio(response.data);
        dispatch({
          type: "SET_PORTFOLIO_DATA",
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolio();
  }, [setIsLoading, setPortfolio]);

  const handleCopyLink = () => {
    if (portfolio?._id) {
      const link = `${window.location.origin}/portfolio/${portfolio._id}`;
      navigator.clipboard
        .writeText(link)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
        });
    }
  };

  const handleUpdateData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.patch("/portfolio/update", state);
      setPortfolio(response.data.portfolio);
      dispatch({
        type: "SET_PORTFOLIO_DATA",
        payload: response.data.portfolio,
      });
      toast.success(response.data.message);
      // sessionStorage.removeItem("formState");
      // sessionStorage.removeItem("currentStep");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const newman = sessionStorage.getItem("formState");
  console.log("newman",JSON.stringify(newman))

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-12 h-12 animate-spin text-purple-800" />
      </div>
    );
  }

  return (
    <div>
      {!portfolio ? (
        <MultiStepForm
          //Global
          state={state}
          dispatch={dispatch}
          //Profile
          fileInputRef={fileInputRef}
          handleIconClick={handleIconClick}
          handleImageUpload={handleImageUpload}
          //Skill
          skillInputRef={skillInputRef}
          addSkill={addSkill}
          removeSkill={removeSkill}
          //Social
          addSocial={addSocial}
          removeSocial={removeSocial}
          social={social}
          setSocial={setSocial}
          url={url}
          setUrl={setUrl}
          //Project
          newProject={newProject}
          setNewProject={setNewProject}
          techStackInput={techStackInput}
          setTechStackInput={setTechStackInput}
          handleAddTechStack={handleAddTechStack}
          projectIndex={projectIndex}
          handleProjectClick={handleProjectClick}
          handleRemoveTechStack={handleRemoveTechStack}
          handleAddProject={handleAddProject}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 pt-20 md:pt-0 gap-12 px-12 py-6">
          <div className="m-0">
            <div className="mt-6 flex items-center">
              <Input
                type="text"
                className="rounded-r-none"
                value={`${window.location.origin}/portfolio/${portfolio._id}`}
                readOnly
              />
              <Button
                onClick={handleCopyLink}
                className="px-4 flex items-center cursor-pointer gap-2 py-2 bg-[#8B5DFF] hover:bg-[#6A42C2] text-white rounded-l-none"
              >
                <Link className="h-4 w-4" />
                Copy
              </Button>
            </div>
            {/* Profile Section */}
            <Profile
              imageLoading={imageLoading}
              dispatch={dispatch}
              fileInputRef={fileInputRef}
              state={state}
              handleImageLoading={handleImageLoading}
              handleIconClick={handleIconClick}
              handleImageUpload={handleImageUpload}
            />

            {/* Skills Section */}
            <Skill
              skillInputRef={skillInputRef}
              addSkill={addSkill}
              removeSkill={removeSkill}
              dispatch={dispatch}
              state={state}
            />
          </div>

          <div>
            {/* Social and Contact Section */}
            <Social
              state={state}
              dispatch={dispatch}
              addSocial={addSocial}
              removeSocial={removeSocial}
              social={social}
              setSocial={setSocial}
              url={url}
              setUrl={setUrl}
            />

            {/* Projects Section */}
            <Project
              portfolio={portfolio}
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
              handleUpdateData={handleUpdateData}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
