import React, { useEffect, useState } from 'react'
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { CustomButton } from '../Button/Button'
import { CustomModal } from '../CustomModal/CustomModal'
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Input from '@mui/material/Input';
import FileUpload from "react-material-file-upload";
import './style.scss'
import axios from '../../helpers/axios';
import { useUpdateItemMutation, useGetItemQuery, itemInterface } from '../../store/itemApi';
import { toast } from "react-toastify";

interface AddItemProps {
    id: number,
}

export const EditItem = ({ id }: AddItemProps) => {
    const { data: item } = useGetItemQuery(id);
    const [modalAdd, setModalAdd] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [starting_Date, setStarting_Date] = React.useState<Dayjs>(dayjs('2022-04-07'));
    const [ending_Date, setEnding_Date] = React.useState<Dayjs>(dayjs('2022-04-07'));
    const [start_price, setStart_price] = useState(0)
    const [files, setFiles] = useState<File[]>([]);


    useEffect(() => {
        if (item) {
            setName(item.name)
            setDescription(item.description)
            setStarting_Date(dayjs(item.starting_Date));
            setEnding_Date(dayjs(item.ending_Date));
            setStart_price(item.start_price)
        }
    }, [item])


    const [editItem] = useUpdateItemMutation()
    const submitButton = async () => {


        try {

            const body: itemInterface = {
                id,
                name: name,
                description: description,
                start_price: start_price,
                starting_Date: new Date(starting_Date.toString()),
                ending_Date: new Date(ending_Date.toString()),
            }
            if (files[0]) {
                const formData = new FormData();
                formData.append("image", files[0]);
                const imageLink = await axios.post("/upload", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                body.image = imageLink.data.image;
            }

            const responseFiles: any = await editItem(body)
            if (responseFiles.data) {
                toast.dismiss();
                toast.success("Item updated Successfully");
                setModalAdd(false);

            } else {
                toast.dismiss();
                toast.error("Item Couldn't be updated");

            }

        } catch (error) {
            toast.dismiss();
            toast.error("Item Couldn't be updated");
        }


    }

    return (

        <CustomModal buttonComponent={<CustomButton onClick={() => { setModalAdd(true) }} sx={{ mr: '10px', ":hover": { backgroundColor: "green" } }}  >EDIT</CustomButton >}
            open={modalAdd}
            setOpen={setModalAdd}
        >
            <div className="add-Item_container">
                <h1>Edit Item</h1>
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ width: '100%' }}
                // defaultValue="Name of the Item"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                />
                <FormControl>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        value={start_price}
                        type="number"
                        required
                        onChange={(e) => { setStart_price(parseInt(e.target.value)) }}
                    />
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Starting Date"
                        value={starting_Date}
                        onChange={(newValue) => {
                            newValue && setStarting_Date(newValue);
                        }}
                    />
                </LocalizationProvider>


                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Ending Date"
                        value={ending_Date}
                        onChange={(newValue) => {
                            newValue && setEnding_Date(newValue);
                        }}
                    />
                </LocalizationProvider>
                <FileUpload value={files} onChange={setFiles} title='Upload image' maxFiles={1} />
                <CustomButton onClick={submitButton} >Submit</CustomButton>

            </div>
        </CustomModal>
    )

}
