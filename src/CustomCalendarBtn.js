import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import EventNoteIcon from '@mui/icons-material/EventNote';
import PropTypes from 'prop-types';
import moment from 'moment';

const CustomDatePicker = ({ value, onChange, placeholder, label }) => {

    const handleDateChange = (newValue) => {
        // Ensure newValue is converted to the expected format or dayjs object before passing up
        onChange(newValue ? moment(newValue, 'DD/MM/YYYY') : null);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box>
                {label && <Typography>{label}</Typography>}
                <DatePicker
                    value={value ? moment(value, 'DD/MM/YYYY') : null}
                    sx={{ width: '100%'}}
                    onChange={handleDateChange}
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={placeholder}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {params.InputProps.endAdornment}
                                        <EventNoteIcon color="action" style={{ marginRight: 8 }} />
                                    </>
                                ),
                            }}
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />
            </Box>
        </LocalizationProvider>
    );
}

CustomDatePicker.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string,
};

export default CustomDatePicker;
