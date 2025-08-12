import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FolderPen, Trash2 } from "lucide-react";
import { type ProjectProps } from "@/types/props";

function Project({
  portfolio,
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
  handleUpdateData,
}: ProjectProps) {
  return (
    <div className="space-y-4 border-solid border-t-2 pt-2">
      {/* Title */}
      {portfolio ? (
        <>
          <div>
            <label className="text-xs md:p-1 mb-1">
              The name of the project
            </label>
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

          <div>
            <label className="text-xs md:p-1 mb-1">
              A short description or summary of what the project is about
            </label>
            <Textarea
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  description: e.target.value,
                })
              }
              value={newProject.description}
              name="description"
              className="resize-none rounded p-2 w-full"
              rows={4}
              placeholder="Summarize your project..."
            />
          </div>

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

          <div>
            <label className="text-xs md:p-1 mb-1">
              Link to the project's source code on GitHub
            </label>
            <Input
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  githubLink: e.target.value,
                })
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

          {state.projects.length > 0 && (
            <div>
              <label className="text-sm font-semibold p-1 mb-1">Projects</label>
              <div className="flex space-x-2">
                {state.projects.map((project, index) => (
                  <div
                    key={index}
                    className="border-4 md:w-fit flex justify-between border-[#8B5DFF] p-4 rounded-lg"
                  >
                    <div className="space-y-1">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {project.title}
                      </h4>

                      <p className="text-sm line-clamp-1 w-40 text-gray-600">
                        {project.description}
                      </p>

                      <span className="text-sm text-gray-500">
                        Stack: {project.techStack.join(", ")}
                      </span>
                      <div className="flex flex-wrap gap-2">
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
                          dispatch({
                            type: "REMOVE_PROJECT",
                            payload: index,
                          })
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
            </div>
          )}

          <div className="flex justify-end space-x-5 pt-6">
            <Button
              className="hover:bg-[#6A42C2] cursor-pointer bg-[#8B5DFF]"
              onClick={handleAddProject}
            >
              {typeof projectIndex === "number"
                ? "Update Project"
                : "Add Project"}
            </Button>
            <Button
              disabled={
                portfolio.profileImage === state.profileImage &&
                portfolio.username === state.username &&
                portfolio.bio === state.bio &&
                portfolio.skills.length === state.skills.length &&
                JSON.stringify(portfolio.skills.sort()) ===
                  JSON.stringify(state.skills.sort()) &&
                portfolio.education === state.education &&
                portfolio.experience === state.experience &&
                JSON.stringify(portfolio.socialLinks) ===
                  JSON.stringify(state.socialLinks) &&
                portfolio.projects.length === state.projects.length &&
                JSON.stringify(portfolio.projects.sort()) ===
                  JSON.stringify(state.projects.sort()) &&
                portfolio.contact === state.contact
              }
              className="hover:bg-[#6A42C2] cursor-pointer bg-[#8B5DFF]"
              onClick={handleUpdateData}
            >
              Save Changes
            </Button>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Project;
