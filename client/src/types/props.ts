import type { FormState, ProjectType, SocialLinks } from "./form";

export type ProfileProps = {
  handleImageLoading: () => void;
  handleIconClick: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageLoading: boolean;
  state: {
    profileImage: string;
    username: string;
    bio: string;
  };
  dispatch: React.Dispatch<any>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
};


export type ProjectProps = {
  state:FormState;
  dispatch: React.Dispatch<any>;
  portfolio: FormState | null;
  newProject: ProjectType;
  setNewProject: React.Dispatch<React.SetStateAction<ProjectType>>;
  techStackInput: string;
  setTechStackInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddTechStack: () => void;
  projectIndex: number | null;
  handleProjectClick: (project: ProjectType, index: number) => void;
  handleRemoveTechStack: (stackToRemove: string) => void;
  handleAddProject: () => void;
  handleUpdateData: () => Promise<void>;
};

export type SkillProps = {
  skillInputRef: React.RefObject<HTMLInputElement | null>;
  addSkill: (skillInput: string) => void;
  removeSkill: (skillToRemove: string) => void;
  dispatch: React.Dispatch<any>;
  state: {
    skills: string[];
    education: string;
    experience: string;
  };
};

export type SocialProps = {
  state: {
    socialLinks: SocialLinks;
    contact: { gmail: string; number: string };
  };
  dispatch: React.Dispatch<any>;
  addSocial: () => void;
  removeSocial: (socialPlatform: string) => void;
  social: string | undefined;
  setSocial: React.Dispatch<React.SetStateAction<string | undefined>>;
  url: string | undefined;
  setUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
};