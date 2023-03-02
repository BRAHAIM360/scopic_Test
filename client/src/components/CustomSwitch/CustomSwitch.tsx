import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

interface CustomSwitchProps {
  label: string;
  enbled: boolean;
  setEnbled: (enbled: boolean) => void;
  onChange: () => void;
}

export const CustomSwitch = ({ label, enbled, setEnbled, onChange }: CustomSwitchProps) => {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch checked={enbled} onChange={onChange} />} label={label} />
    </FormGroup>
  );
};
