import { socialPlatforms, type SocialLinks } from "@/types/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { type SocialProps } from "@/types/props";

function Social({
  state,
  dispatch,
  addSocial,
  removeSocial,
  social,
  setSocial,
  url,
  setUrl,
}: SocialProps) {
  return (
    <div>
      <div className="space-y-4 pb-4">
        <label className="text-sm font-bold md:p-1 mb-1">
          Social Media Links
        </label>
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
      </div>

      <div>
        <label className="text-sm font-bold md:p-1 mb-1">Contacts</label>
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
    </div>
  );
}

export default Social;
