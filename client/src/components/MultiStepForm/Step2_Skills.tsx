import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ArrowLeft } from "lucide-react";

export type Props = {
  onNext: () => void;
  onBack: () => void;
  dispatch: React.Dispatch<any>;
  state: {
    skills: string[];
    education: string;
    experience: string;
  };
  skillInputRef: React.RefObject<HTMLInputElement | null>;
  addSkill: (skillInput: string) => void;
  removeSkill: (skillToRemove: string) => void;
};

function Step2_Skills({
  state,
  dispatch,
  skillInputRef,
  addSkill,
  removeSkill,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs md:p-1 mb-1">
          {" "}
          What are your key skills or expertise? (e.g., Web Development, Graphic
          Design, Marketing)
        </label>
        <div className="flex gap-2 mb-2">
          <Input
            ref={skillInputRef}
            type="text"
            onKeyDown={(e) =>
              e.key === "Enter" && addSkill(e.currentTarget.value)
            }
            className="border rounded p-2 w-full"
            placeholder="Add a skill"
          />
          <Button
            onClick={(e) => {
              const prev = e.currentTarget
                .previousElementSibling as HTMLInputElement | null;
              if (prev && prev.value) {
                addSkill(prev.value);
              }
            }}
            className="bg-[#8B5DFF] hover:bg-[#6A42C2] cursor-pointer text-white rounded px-4 py-2"
          >
            ADD
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {state.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-[#8B5DFF] hover:bg-[#6A42C2] text-sm text-white px-3 py-1 rounded-sm flex items-center gap-1"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
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
          {" "}
          What's your educational background?
        </label>
        <Input
          type="text"
          value={state.education}
          onChange={(e) =>
            dispatch({
              type: "ADD_SKILLS",
              payload: {
                skills: state.skills,
                education: e.target.value,
                experience: state.experience,
              },
            })
          }
          className="border rounded p-2 w-full"
          placeholder="e.g., B.Sc in Computer Science"
        />
      </div>

      <div>
        <label className="text-xs md:p-1 mb-1">
          {" "}
          Please share a brief summary of your professional experience.
        </label>
        <Textarea
          value={state.experience}
          onChange={(e) =>
            dispatch({
              type: "ADD_SKILLS",
              payload: {
                skills: state.skills,
                education: state.education,
                experience: e.target.value,
              },
            })
          }
          className="resize-none rounded p-2 w-full"
          rows={4}
          placeholder="Summarize your work experience..."
        />
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

export default Step2_Skills;
