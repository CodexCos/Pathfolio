import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { type SkillProps } from "@/types/props";

function Skill({
  skillInputRef,
  addSkill,
  removeSkill,
  dispatch,
  state,
}: SkillProps) {

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-bold md:p-1 mb-1"> Skill</label>
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
        <label className="text-sm font-bold md:p-1 mb-1"> Education</label>
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
        <label className="text-sm font-bold md:p-1 mb-1"> Experience</label>
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
    </div>
  );
}

export default Skill;
