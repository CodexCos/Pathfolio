import { Button } from "../ui/button";
import { ArrowLeft, FolderPen, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { type FormState, type ProjectType } from "@/types/form";

type Props = {
  onNext: () => void;
  onBack: () => void;
  state: FormState;
  dispatch: React.Dispatch<any>;
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

function Step4_Projects({
  onNext,
  onBack,
  state,
  dispatch,
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
  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className="text-xs md:p-1 mb-1"> The name of the project</label>
        <div className="flex gap-2 mb-2">
          <Input
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            value={newProject.title}
            name="title"
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Title"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-xs md:p-1 mb-1">
          {" "}
          A short description or summary of what the project is about
        </label>
        <Textarea
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
          value={newProject.description}
          name="description"
          className="resize-none rounded p-2 w-full"
          rows={4}
          placeholder="Summarize your project..."
        />
      </div>

      {/* TenStack */}
      <div>
        <label className="text-xs md:p-1 mb-1">
          A list of tools, frameworks, and languages used in the project
        </label>
        <div className="flex gap-2 mb-2">
          <Input
            onChange={(e) => setTechStackInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTechStack()}
            value={techStackInput}
            name="techStack"
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Tools"
          />
          <Button
            onClick={handleAddTechStack}
            className="bg-[#8B5DFF] hover:bg-[#6A42C2] cursor-pointer text-white rounded px-4 py-2"
          >
            ADD
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {newProject.techStack.map((stack, index) => (
            <span
              key={index}
              className="bg-[#8B5DFF] hover:bg-[#6A42C2] text-sm text-white px-3 py-1 rounded-sm flex items-center gap-1"
            >
              {stack}
              <button
                onClick={() => handleRemoveTechStack(stack)}
                className="text-white cursor-pointer font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Socials */}
      <div>
        <div>
          <label className="text-xs md:p-1 mb-1">
            Link to the project's source code on GitHub
          </label>

          <Input
            onChange={(e) =>
              setNewProject({ ...newProject, githubLink: e.target.value })
            }
            value={newProject.githubLink}
            name="githubLink"
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Github"
          />
        </div>

        <div>
          <label className="text-xs md:p-1 mb-1">
            A link to view the live version of the project
          </label>
          <Input
            onChange={(e) =>
              setNewProject({ ...newProject, liveLink: e.target.value })
            }
            value={newProject.liveLink}
            name="liveLink"
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Live Link"
          />
        </div>
      </div>

      {/* Projects */}
      {state.projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
          {state.projects.map((project, index) => (
            <div
              key={index}
              className="border-4 min-w-50 flex justify-between border-[#8B5DFF] p-4 rounded-lg"
            >
              <div className="space-y-1">
                <h4 className="text-lg font-semibold text-gray-800">
                  {project.title}
                </h4>

                <p className="text-sm text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500">
                    Stack: {project.techStack.join(", ")}
                  </span>
                  <a
                    href={project.githubLink}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    GitHub
                  </a>
                  <a
                    href={`https://${project.liveLink}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Live Demo
                  </a>
                </div>
              </div>

              <div className="flex space-x-3">
                <Trash2
                  onClick={() =>
                    dispatch({ type: "REMOVE_PROJECT", payload: index })
                  }
                  className="w-5 cursor-pointer h-5"
                />
                <FolderPen
                  onClick={() => handleProjectClick(project, index)}
                  className="w-5 cursor-pointer h-5"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end space-x-5 pt-6">
        <Button
          className="bg-transparent cursor-pointer text-gray-500 hover:bg-transparent"
          onClick={onBack}
        >
          <ArrowLeft />
          Back
        </Button>
        <Button onClick={onNext} className="hover:bg-[#6A42C2]  bg-[#8B5DFF]">
          Next Step
        </Button>
        <Button
          className="hover:bg-[#6A42C2] bg-[#8B5DFF]"
          onClick={handleAddProject}
        >
          {typeof projectIndex === "number" ? "Update Project" : "Add Project"}
        </Button>
      </div>
    </div>
  );
}

export default Step4_Projects;
