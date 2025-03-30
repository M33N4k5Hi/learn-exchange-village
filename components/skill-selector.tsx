"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Common skills list
const skillsList = [
  // Programming & Tech
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "Java",
  "C++",
  "Data Science",
  "Machine Learning",
  "Web Development",
  "Mobile Development",
  "DevOps",
  "Blockchain",
  "UI/UX Design",

  // Languages
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Russian",
  "Arabic",

  // Arts & Design
  "Graphic Design",
  "Photography",
  "Video Editing",
  "Animation",
  "Drawing",
  "Painting",
  "Digital Art",
  "3D Modeling",
  "Music Production",
  "Writing",
  "Content Creation",

  // Business & Marketing
  "Digital Marketing",
  "SEO",
  "Social Media Marketing",
  "Copywriting",
  "Business Strategy",
  "Project Management",
  "Public Speaking",
  "Sales",
  "Entrepreneurship",
  "Financial Planning",

  // Lifestyle & Hobbies
  "Cooking",
  "Baking",
  "Fitness",
  "Yoga",
  "Meditation",
  "Gardening",
  "Home Improvement",
  "Chess",
  "Musical Instruments",
  "Dancing",
  "Singing",
  "Fashion Design",
]

type SkillSelectorProps = {
  selectedSkills: string[]
  onChange: (skills: string[]) => void
}

export function SkillSelector({ selectedSkills, onChange }: SkillSelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [customSkill, setCustomSkill] = useState("")

  const handleSelect = (currentValue: string) => {
    if (!selectedSkills.includes(currentValue)) {
      onChange([...selectedSkills, currentValue])
    } else {
      onChange(selectedSkills.filter((skill) => skill !== currentValue))
    }
    setValue("")
  }

  const handleAddCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      onChange([...selectedSkills, customSkill])
      setCustomSkill("")
    }
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {value ? skillsList.find((skill) => skill.toLowerCase() === value.toLowerCase()) : "Select skills..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search skills..." />
            <CommandList>
              <CommandEmpty>
                <div className="px-2 py-1.5 text-sm">
                  No skill found. Add a custom skill:
                  <div className="flex mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      placeholder="Enter custom skill"
                    />
                    <Button
                      type="button"
                      size="sm"
                      className="ml-2"
                      onClick={handleAddCustomSkill}
                      disabled={!customSkill}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {skillsList.map((skill) => (
                  <CommandItem key={skill} value={skill} onSelect={() => handleSelect(skill)}>
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedSkills.includes(skill) ? "opacity-100" : "opacity-0")}
                    />
                    {skill}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

