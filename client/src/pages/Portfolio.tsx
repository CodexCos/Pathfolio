import axiosInstance from "@/lib/axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormContext } from "@/context/FormProvider";

function Portfolio() {
  const { portfolioId } = useParams();
  const { setPortfolio, portfolio, isLoading, setIsLoading } = useFormContext();

  console.log("This port:", portfolio);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/portfolio/user/${portfolioId}`
        );
        setPortfolio(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (portfolioId) {
      fetchPortfolio();
    }
  }, [portfolioId]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center">
        {portfolio?.profileImage && (
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-[#8B5DFF]"
            src={portfolio.profileImage}
            alt="Profile"
          />
        )}
        <p className="text-sm text-gray-600 mt-2">{portfolio?.username}</p>

        <p className="text-sm text-gray-600 mt-2">{portfolio?.bio}</p>
      </div>

      {/* Skills Section */}
      {(portfolio?.skills?.length ?? 0) > 0 && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
          <p className="text-sm text-gray-600">{portfolio?.skills.join(",")}</p>
        </div>
      )}

      {/* Education Section */}
      {portfolio?.education && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Education</h3>
          <p className="text-sm text-gray-600">{portfolio.education}</p>
        </div>
      )}

      {/* Experience Section */}
      {portfolio?.experience && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
          <p className="text-sm text-gray-600">{portfolio.experience}</p>
        </div>
      )}

      {/* Social Links Section */}
      {Object.values(portfolio?.socialLinks || {}).some((link) => link) && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Social Links</h3>
          {Object.entries(portfolio?.socialLinks || {}).map(
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
      {(portfolio?.projects?.length ?? 0) > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
          {portfolio?.projects.map((project, index) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Portfolio;
