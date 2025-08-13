import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
  const cloudinaryImageUrl = import.meta.env.VITE_CLOUDINARY_IMAGE_URL;
  return (
    <div>
      <div className="grid h-screen p-6 lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 p-6 md:p-10">
       
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Build Your Stunning Portfolio Today!
          </h1>
       
          <p className="font-light  2xl:text-xl text-gray-600 dark:text-gray-300">
            Whether you're a developer, designer, photographer, or writer, we
            provide the tools to create a professional portfolio that showcases
            your work in the best light. Start building your personal brand now!
          </p>


          <p className="font-light lg:hidden 2xl:text-xl text-gray-600 dark:text-gray-300">
            Stand out, connect with your audience, and grow your personal brand — all in one place. Start building your professional portfolio today!
          </p>

          <div className="flex justify-start mt-4">
            <Button className=" text-white px-6 py-6 shadow-lg hover:bg-[#6A42C2]  bg-[#8B5DFF] transition duration-200">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

        
        </div>
           
        <div className="hidden p-0 m-0 lg:block">
          <img
            src={cloudinaryImageUrl}
            alt="Home Image"
            className=" h-[90vh] w-full p-0 m-0 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
