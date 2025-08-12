import { useFormContext } from "@/context/FormProvider";
import { Button } from "../ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import { type Props } from "@/types/form";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

function Step5_Confirm({ onBack }: Props) {
  const { state, setPortfolio, setIsLoading, isLoading } = useFormContext();

  const handleSubmitData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/portfolio/", state);
      setPortfolio(response.data.portfolio);
      toast.success(response.data.message);
      sessionStorage.removeItem("formState");
      sessionStorage.removeItem("currentStep");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const hasData =
    state.profileImage ||
    state.username ||
    state.bio ||
    state.skills.length > 0 ||
    state.education ||
    (state.contact.gmail && state.contact.number) ||
    state.experience ||
    Object.values(state.socialLinks).some((link) => link) ||
    state.projects.length > 0;

  return (
    <div className="flex flex-col space-y-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center">
        {state.profileImage && (
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-[#8B5DFF]"
            src={state.profileImage}
            alt="Profile"
          />
        )}
        <p className="text-sm text-gray-600 mt-2">{state.username}</p>

        <p className="text-sm text-gray-600 mt-2">{state.bio}</p>
      </div>

      {/* Skills Section */}
      {state.skills.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
          <p className="text-sm text-gray-600">{state.skills.join(",")}</p>
        </div>
      )}

      {/* Education Section */}
      {state.education && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Education</h3>
          <p className="text-sm text-gray-600">{state.education}</p>
        </div>
      )}

      {/* Contact Section */}
      {state.contact.gmail && state.contact.number && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Contact</h3>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-black">Email:</span>{" "}
            {state.contact.gmail}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-black">Number:</span>{" "}
            {state.contact.number}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {state.experience && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
          <p className="text-sm text-gray-600">{state.experience}</p>
        </div>
      )}

      {/* Social Links Section */}
      {Object.values(state.socialLinks).some((link) => link) && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Social Links</h3>
          {Object.entries(state.socialLinks).map(
            ([platform, link]) =>
              link && (
                <div
                  key={platform}
                  className="flex justify-between items-center"
                >
                  <span className="font-semibold capitalize">{platform}:</span>
                  <a
                    href={link.startsWith("http") ? link : `https://${link}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {link}
                  </a>
                </div>
              )
          )}
        </div>
      )}
      {/* Projects Section */}
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
                  Title: {project.title}
                </h4>

                <p className="text-sm text-gray-600">
                  Description: {project.description}
                </p>
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
            </div>
          ))}
        </div>
      )}

      {!hasData && <span>Nothing to see here :3</span>}

      {/* Navigation Buttons */}
      <div className="flex justify-end space-x-5 pt-6">
        <Button
          className="bg-transparent cursor-pointer text-gray-500 hover:bg-transparent"
          onClick={onBack}
        >
          <ArrowLeft />
          Back
        </Button>
        <Button
          onClick={handleSubmitData}
          className="hover:bg-[#6A42C2]  bg-[#8B5DFF]"
        >
          {isLoading ? <Loader /> : "Confirm"}
        </Button>
      </div>
    </div>
  );
}

export default Step5_Confirm;
