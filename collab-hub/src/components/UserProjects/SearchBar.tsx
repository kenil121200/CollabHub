import React from 'react';
import { TextField, Box } from '@mui/material';
import { styled } from '@mui/system';

interface SearchBarProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ced4da',
        },
        '&:hover fieldset': {
            borderColor: '#adb5bd',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#adb5bd',
        },
    },
    '& .MuiInputBase-root': {
        backgroundColor: '#f8f9fa',
        color: '#212529',
        height: '40px',
    },
    '& .MuiInputBase-input': {
        padding: '10px 14px',
    },
    '& .MuiInputBase-input::placeholder': {
        color: '#495057',
    },
    '& .MuiInputLabel-root': {
        color: '#495057',
    },
});

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <Box className="flex justify-between items-center my-6 space-x-4">
            <StyledTextField
                label="Find..."
                variant="outlined"
                className="flex-grow"
                value={value}
                onChange={onChange}
            />
        </Box>
    );
};

export default SearchBar;
