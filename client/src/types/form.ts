export const socialPlatforms = [
  "github",
  "linkedin",
  "twitter",
  "instagram",
  "facebook",
  "website",
];

export type ProjectType = {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
  website: string;
};

export type Contact = {
  gmail: string;
  number: string;
};

export type FormState = {
  _id: string;
  username: string;
  profileImage: string;
  bio: string;
  skills: string[];
  education: string;
  experience: string;
  socialLinks: SocialLinks;
  contact: Contact;
  projects: ProjectType[];
};

export const initialState: FormState = {
  _id: "",
  username: "",
  profileImage: "",
  bio: "",
  skills: [],
  education: "",
  experience: "",
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    website: "",
  },
  contact: {
    gmail: "",
    number: "",
  },
  projects: [],
};


export type Action =
  | {
      type: "ADD_PROFILE";
      payload: { profileImage: string; bio: string; username: string };
    }
  | {
      type: "ADD_SKILLS";
      payload: { skills: string[]; education: string; experience: string };
    }
  | { type: "ADD_SOCIAL"; payload: SocialLinks }
  | { type: "ADD_PROJECT"; payload: ProjectType }
  | {
      type: "UPDATE_PROJECT";
      payload: { index: number; updatedProject: ProjectType };
    }
  | { type: "ADD_CONTACT"; payload: { gmail: string; number: string } }
  | { type: "REMOVE_PROJECT"; payload: number }
  | {
      type: "SET_PORTFOLIO_DATA";
      payload: {
        profileImage: string;
        username: string;
        bio: string;
        skills: string[];
        education: string;
        experience: string;
        socialLinks: SocialLinks;
        contact:Contact;
        projects: ProjectType[];
      };
    };


