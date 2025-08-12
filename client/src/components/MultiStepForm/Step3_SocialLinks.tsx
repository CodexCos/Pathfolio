import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { ArrowLeft } from "lucide-react";
import { type SocialLinks, socialPlatforms } from "@/types/form";

type Props = {
  onNext: () => void;
  onBack: () => void;
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

function Step3_SocialLinks({
  onNext,
  onBack,
  state,
  dispatch,
  addSocial,
  removeSocial,
  social,
  setSocial,
  url,
  setUrl,
}: Props) {
  return (
    <div className="space-y-4">
      <label className="text-xs md:p-1 mb-1">Add Your Social Media Links</label>
      <div className="flex space-x-4">
        <Select value={social} onValueChange={(val) => setSocial(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Social" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {socialPlatforms.map((items, index) => (
                <SelectItem
                  disabled={
                    state.socialLinks[items as keyof SocialLinks] !== ""
                  }
                  value={items}
                  key={index}
                >
                  {items.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          value={url}
          onKeyDown={(e) => e.key === "Enter" && addSocial()}
          onChange={(e) => setUrl(e.target.value)}
        />

        <Button
          onClick={() => addSocial()}
          className="bg-[#8B5DFF] hover:bg-[#6A42C2] cursor-pointer text-white rounded px-4 py-2"
        >
          ADD
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(state.socialLinks).map(
          ([platform, link]) =>
            link && (
              <div key={platform}>
                <div className="bg-[#8B5DFF] hover:bg-[#6A42C2] text-sm text-white px-3 py-1 rounded-sm flex items-center gap-1">
                  <a
                    href={link.startsWith("h") ? link : `https://${link}`}
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                    target="_blank"
                  >
                    {platform.charAt(0).toUpperCase() +
                      platform.slice(1, platform.length)}
                  </a>

                  <button
                    onClick={() => removeSocial(platform)}
                    className="text-white cursor-pointer font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            )
        )}
      </div>

      <div>
        <label className="text-xs md:p-1 mb-1">
          Add Your Contact Information
        </label>
        <div className="flex gap-2 mb-2">
          <Input
            onChange={(e) =>
              dispatch({
                type: "ADD_CONTACT",
                payload: {
                  gmail: e.target.value,
                  number: state.contact.number,
                },
              })
            }
            value={state.contact.gmail}
            name="email"
            type="email"
            className="border rounded p-2 w-full"
            placeholder="Add Email"
          />
          <Input
            onChange={(e) =>
              dispatch({
                type: "ADD_CONTACT",
                payload: {
                  gmail: state.contact.gmail,
                  number: e.target.value,
                },
              })
            }
            value={state.contact.number}
            name="number"
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Add Number"
          />
        </div>
      </div>

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
      </div>
    </div>
  );
}

export default Step3_SocialLinks;
