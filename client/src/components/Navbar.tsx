import { GalleryVerticalEnd } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { Menu } from "lucide-react";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useFormContext } from "@/context/FormProvider";
function Navbar() {
  const { user, logout, loading } = useAuth();
  const { state } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="w-full mb-6 md:mb-0 fixed bg-white md:relative flex justify-between border-2 items-center py-4 px-12">
      <Link to="/">
        <div className="flex items-center gap-2 font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4 bg-[#8B5DFF] " />
          </div>
          <span> Portfolio</span>
        </div>
      </Link>

      {/* Desktop Navbar */}
      <div className="hidden md:block space-x-6">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
      </div>

      <div className="hidden md:block space-x-2">
        {user ? (
          <div className="flex items-center space-x-5">
            <h1>{user.username}</h1>
            <Button
              className="cursor-pointer hover:bg-[#6A42C2]  bg-[#8B5DFF] "
              onClick={logout}
            >
              LOGOUT
              <LogOut />
            </Button>
          </div>
        ) : (
          <div className="space-x-2">
            <Button className="rounded-sm bg-[#8B5DFF] hover:bg-[#6A42C2]">
              <Link to="/login">Log In</Link>
            </Button>

            <Button className="rounded-sm hover:bg-[#6A42C2] bg-transparent border-2 text-black border-black hover:text-white">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <Menu onClick={toggleMenu} className=" cursor-pointer md:hidden" />
      {isOpen && (
        <div className="flex space-y-10 items-start p-12 flex-col h-screen backdrop-blur-2xl  transition-all text-2xl text-black  duration-300 ease-in-out  bg-transparent md:hidden w-full top-15 left-0 z-50 fixed">
          <Link onClick={() => toggleMenu()} to="/about">
            About
          </Link>
          <Link onClick={() => toggleMenu()} to="/contact">
            Contact
          </Link>
          {user && (
            <>
              <Link onClick={() => toggleMenu()} to="/dashboard">
                Dashboard
              </Link>
              <button
                className="rounded-sm flex items-center gap-3 cursor-pointer text-2xl  bg-transparent text-black"
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
              >
                Log Out
                <LogOut />
              </button>
            </>
          )}

          {user && (
            <div className="flex mt-auto mb-12 space-x-5">
              <div className="flex space-x-4 items-center">
                <Avatar className="rounded-lg h-8 w-8 ">
                  <AvatarImage src={state.profileImage} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{user.username}</span>
                  <span className="font-light text-sm">{user.email}</span>
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div className="space-x-4 flex w-full mt-auto mb-12 justify-center">
              <Button
                onClick={() => toggleMenu()}
                className="rounded-sm hover:bg-[#6A42C2] shadow-lg bg-transparent text-xl text-black hover:text-white"
              >
                <Link to="/login">Log In</Link>
              </Button>

              <Button
                onClick={() => toggleMenu()}
                className="rounded-sm hover:bg-[#6A42C2] bg-transparent border-2 text-xl text-black border-black hover:text-white"
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
