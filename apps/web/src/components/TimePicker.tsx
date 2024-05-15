import { Label } from "@radix-ui/react-label";
import { Clock3Icon } from "lucide-react";
import React, { useState } from "react";

interface TimePickerProps {
  name: string;
  label: string;
  isError: boolean;
  onChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  onChange,
  label,
  name,
  isError,
}) => {
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    setSelectedTime(time);
    onChange(time);
    setIsTimeSelected(!!time);
  };

  return (
    <div className="my-2 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
      <Label htmlFor={name} className={isError ? "text-red-600" : "text-sm"}>
        {label}
      </Label>
      <div>
        <div className="flex h-12 flex-row items-center justify-start rounded-sm bg-marine-100 pl-4 text-left font-normal md:w-full">
          <Clock3Icon className={`mr-2 h-12 w-4 ${isTimeSelected ? "text-black" : "text-gray-500"}`} />
          <input 
            type="time" 
            className={` ${isTimeSelected ? "text-black bg-transparent" : "text-gray-500 bg-transparent"}`} 
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
