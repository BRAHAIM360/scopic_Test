import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

interface CustomSwitchProps {
  label: string;
  enbled: boolean;
  setEnbled: (enbled: boolean) => void;
}

export const CustomSwitch = ({ label, enbled, setEnbled }: CustomSwitchProps) => {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked={enbled} onChange={() => setEnbled(!enbled)} />} label={label} />
    </FormGroup>
  );
};
