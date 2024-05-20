import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Checkbox, FormControlLabel, FormGroup, Box, Typography, MenuItem, Select } from '@mui/material';
import CustomDatePicker from './CustomCalendarBtn';
import { connect, getIn } from 'formik';
import moment from 'moment';
import ImageUploadButton from './ImgUploadBtn';
import { Radio, RadioGroup } from '@mui/material';


const responsiveFontSize = {
    fontSize: '14px',
    fontWeight: 600,
    '@media (min-width:600px)': {
        fontSize: '16px'
    },
}

class MaterialUIFieldAdapter extends Component {
    static propTypes = {
        formik: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        rowRadio: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired
        })),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,  // For date or complex objects
            PropTypes.array, // for multiSelect
            PropTypes.instanceOf(File)  // For file inputs
        ])
    };

    static defaultProps = {
        rowRadio: true  // Default value if not provided
    };

    handleChange = (event) => {
        const { formik, name } = this.props;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        
        formik.setFieldValue(name, value);
    };

    handleBlur = () => {
        const { formik, name } = this.props;
        formik.setFieldTouched(name, true);
    };

    renderComponent = () => {
        const { type, name, label, formik, placeholder, options, rowRadio} = this.props;
        const { values, errors, touched } = formik;
        const value = getIn(values, name);
        const error = getIn(errors, name);
        const touch = getIn(touched, name);

        switch (type) {
            case 'text':
            case 'number':
            case 'email':
                return (
                    <Box alignSelf={'center'} sx={{ mb: '24px',}}>
                        {label && <Typography style={responsiveFontSize} textAlign={'left'}>{label}</Typography>}
                        <TextField
                            type={type}
                            fullWidth
                            sx={[{ width: "100%", borderRadius: '10px', maxHeight: '48px', }]}
                            name={name}
                            value={value || ''}
                            InputLabelProps={{ shrink: false }}
                            placeholder={placeholder}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            error={touch && Boolean(error)}
                            helperText={touch && error}
                        />
                    </Box>
                );
            case 'textarea':
                return (
                    <Box alignSelf={'center'} fullWidth sx={{ mb: '24px' }}>
                        {label && <Typography style={responsiveFontSize} textAlign={'left'}>{label}</Typography>}
                        <TextField
                            multiline
                            maxRows={5}
                            fullWidth
                            sx={{ minWidth: '328px', borderRadius: '10px', maxHeight: '120px' }}
                            name={name}
                            value={value || ''}
                            placeholder={placeholder}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            inputProps={{
                                maxLength: 50
                            }}
                            helperText={`${value.length}/50`}
                            FormHelperTextProps={{
                                sx: { textAlign: 'right' } // This style will align the helper text to the right
                            }}
                            error={touch && Boolean(error)}
                        />
                    </Box>
                );

            case 'checkbox':
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={value || false}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    name={name}
                                />
                            }
                            label={label}
                        />
                    </FormGroup>
                );

            case 'select':
                return (
                    <Box alignSelf={'center'} sx={{ mb: '24px'}}>
                        {label && <Typography style={responsiveFontSize} textAlign={'left'}>{label}</Typography>}
                        <Select
                            fullWidth
                            sx={{ borderRadius: '4px', maxHeight: '48px', }}
                            name={name}
                            value={value || ''}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            displayEmpty
                            error={touch && Boolean(error)}
                        >
                            {options.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    <Typography >{option.label}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                        {touch && error && <Typography color="error">{error}</Typography>}
                    </Box>
                );
            
            case 'multiselect':
                return (
                    <Box alignSelf={'center'} fullWidth sx={{ mb: '24px' }}>
                        {label && <Typography style={responsiveFontSize} textAlign={'left'}>{label}</Typography>}
                        <Select
                            multiple
                            fullWidth
                            sx={{ borderRadius: '4px', maxHeight: '48px', overflow: 'auto' }}
                            name={name}
                            value={formik.values[name] || []}  // Ensure the value is an array for multiple selections
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            renderValue={selected => Array.isArray(selected) ? selected.map(item =>
                                (options.find(option => option.value === item) || {}).label).join(', ') : selected
                            }
                            error={touch && Boolean(error)}
                        >
                            {options.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    <Typography>{option.label}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                        {touch && error && <Typography color="error">{error}</Typography>}
                    </Box>
                );


            case 'date':
                return (
                    <Box alignSelf={'center'} fullWidth sx={{ mb: "24px", }}>
                        <CustomDatePicker
                            label={label}
                            value={getIn(formik.values, name)}
                            onChange={(date) => {
                                formik.setFieldValue(name, date ? moment(date, 'DD/MM/YYYY') : '');
                            }}
                            onBlur={this.handleBlur}
                            placeholder={placeholder || 'DD/MM/YYYY'}
                        />
                        {touch && error && <Typography color="error">{error}</Typography>}
                    </Box>
                );

            case 'radio':
                return (
                    <Box alignSelf={'center'} fullWidth sx={{ mb: '24px', }}>
                        {label && <Typography style={responsiveFontSize} textAlign={'left'}>{label}</Typography>}
                        <RadioGroup
                            name={name}
                            sx={{ width: "100%", justifyContent: 'space-between'}}
                            value={value || ''}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            row={rowRadio}  // Set 'row' to true if you want horizontal layout
                        >
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                        {touch && error && <Typography color="error">{error}</Typography>}
                    </Box>
                );

            case 'file':
                return (
                    <Box alignSelf={'center'} fullWidth sx={{ mb: '24px' }}>
                        <ImageUploadButton
                            onFileSelect={(file) => {
                                // Update the Formik state with the file object
                                formik.setFieldValue(name, file);
                            }}
                            label={label}
                        />
                        {touch && error && <Typography color="error">{error}</Typography>}
                    </Box>
                );

            default:
                return <div>Unsupported type</div>;
        }
    };

    render() {
        return this.renderComponent();
    }
}

export default connect(MaterialUIFieldAdapter);
