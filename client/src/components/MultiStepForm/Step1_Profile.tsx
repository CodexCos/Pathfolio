import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImagePlus } from "lucide-react";

type Props = {
  onNext: () => void;
  state: {
    profileImage: string;
    username: string;
    bio: string;
  };
  dispatch: React.Dispatch<any>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleIconClick: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Step1_Profile({
  onNext,
  state,
  dispatch,
  fileInputRef,
  handleIconClick,
  handleImageUpload,
}: Props) {

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <label className="text-xs p-1 mb-1">
          Please provide your profile picture
        </label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />

        <div className=" cursor-pointer w-fit" onClick={handleIconClick}>
          {!state.profileImage ? (
            <ImagePlus className="mt-2 p-1 w-24 h-24 text-white bg-gray-200 rounded-full object-contain" />
          ) : (
            <img
              src={state.profileImage}
              alt="Profile Preview"
              className="mt-2 w-24 h-24 rounded-full border-4 border-[#8B5DFF] object-cover"
            />
          )}
        </div>
      </div>

      <div>
        <label className="text-xs md:p-1 mb-1">Please enter your name</label>

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
        <label className="text-xs md:p-1 mb-1">
          Please enter a short bio about yourself
        </label>

        <Textarea
          placeholder="Write a short bio to introduce yourself..."
          value={state.bio}
          onChange={(e) =>
            dispatch({
              type: "ADD_PROFILE",
              payload: {
                profileImage: state.profileImage,
                username: state.username,
                bio: e.target.value,
              },
            })
          }
          className=" resize-none p-2 w-full"
          rows={4}
        />
      </div>

      <div className="text-right">
        <Button
          className="cursor-pointer hover:bg-[#6A42C2]  bg-[#8B5DFF]"
          onClick={onNext}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}

export default Step1_Profile;
