import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import {type ProfileProps } from "@/types/props";

function Profile({
  handleImageLoading,
  handleIconClick,
  handleImageUpload,
  state,
  dispatch,
  fileInputRef,
  imageLoading,
}: ProfileProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <label className="text-sm font-semibold p-1 mb-1">
          Profile Picture
        </label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />

        <div className="cursor-pointer w-fit " onClick={handleIconClick}>
          {imageLoading && (
            <Skeleton className="mt-2 w-24 h-24 rounded-full  border-4 border-[#8B5DFF] object-cover" />
          )}
          <img
            src={state.profileImage}
            alt="Profile Preview"
            onLoad={handleImageLoading}
            className={`mt-2 w-24 h-24 rounded-full ${
              !imageLoading ? "block" : "hidden"
            } border-4 border-[#8B5DFF] object-cover`}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-bold md:p-1 mb-1">Name</label>
        <Input
          placeholder="Enter your full name"
          value={state.username}
          onChange={(e) =>
            dispatch({
              type: "ADD_PROFILE",
              payload: {
                profileImage: state.profileImage,
                username: e.target.value,
                bio: state.bio,
              },
            })
          }
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="text-sm font-bold md:p-1 mb-1">Bio</label>

        <Textarea
          placeholder="Write a short bio to introduce yourself..."
          value={state.bio}
          onChange={(e) =>
            dispatch({
              type: "ADD_PROFILE",
              payload: {
                username: state.username,
                bio: e.target.value,
                profileImage: state.profileImage,
              },
            })
          }
          className=" resize-none p-2 w-full"
          rows={4}
        />
      </div>
    </div>
  );
}

export default Profile;
