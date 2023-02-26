import { FormControl, InputAdornment, TextField, createStyles } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, useEffect } from 'react'
import "./style.scss"
import { makeStyles } from '@mui/styles';


interface SearchInputProps {
    searchText: string;
    setSearchText: (text: string) => void;
}

export const SearchInput = ({ searchText, setSearchText }: SearchInputProps) => {
    const { search }: any = makeStyles(() => {
        return createStyles({ search: { margin: "0" } });
    });

    const [showClearIcon, setShowClearIcon] = useState("none");

    useEffect(() => {
        if (searchText = "") {
            setShowClearIcon("none")
        } else {
            setShowClearIcon("block")
        }

    }, [searchText])


    return (
        <FormControl className={search}>
            <TextField
                size="small"
                variant="outlined"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            style={{ display: showClearIcon }}
                            onClick={() => { setSearchText(""); }}
                        >
                            <ClearIcon />
                        </InputAdornment>
                    )
                }}
            />
        </FormControl>
    )
}