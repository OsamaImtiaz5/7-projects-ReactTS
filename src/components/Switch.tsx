import { Switch } from "@mui/material";
import React from "react";

type CustomSwitchProps = {
  isChecked: boolean; // Current state of the switch
  label?: string; // Label text
  onChange: (checked: boolean) => void; // Callback to handle state changes
};

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  isChecked,
  label,
  onChange,
}) => {
  return (
    <div className=" flex justify-between items-center">
      {/* Label for the switch */}
      <label className="mr-2 text-sm font-medium">{label}</label>

      {/* MUI Switch Component */}
      <Switch
        color="error" // Switch color
        size="small" // Switch size
        checked={isChecked} // Controlled by the parent
        onChange={(e) => onChange(e.target.checked)} // Pass the new state to the parent
        inputProps={{ "aria-label": label }} // Accessibility
      />
    </div>
  );
};

export default CustomSwitch;
