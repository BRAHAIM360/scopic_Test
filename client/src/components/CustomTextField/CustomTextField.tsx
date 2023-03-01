import { FormControl, FormControlProps, InputAdornment, InputLabel, OutlinedInput, StandardTextFieldProps, TextField, TextFieldProps } from "@mui/material";



interface CustomTextFieldProps extends FormControlProps {
    label: string;
    value: string | number;
    type: string;
    start: string;
    onChange: (e: any) => void;

}

export const CustomTextField = (props: CustomTextFieldProps): JSX.Element => {
    return (


        <FormControl {...props}>
            <InputLabel htmlFor="outlined-adornment-amount">{props.label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">{props.start}</InputAdornment>}
                label={props.label}
                value={props.value}
                type={props.type}
                required
                onChange={(e) => props.onChange(typeof props.value == "number" ? parseInt(e.target.value) : e.target.value)}
            />
        </FormControl>

    )
}
