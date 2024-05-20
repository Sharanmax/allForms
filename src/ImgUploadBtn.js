import React, { useState } from 'react';
import { Button, Box, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

function ImageUploadButton({ onFileSelect, label }) {
    const [file, setFile] = useState(null); // State to hold the uploaded file
    const [previewUrl, setPreviewUrl] = useState(''); // State to hold the preview URL

    const handleUploadClick = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // Handle file processing or updating state
            setFile(selectedFile);
            onFileSelect(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <Box
            sx={{ width: '100%', alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id={`file-upload-${label}`}
                multiple
                type="file"
                onChange={handleUploadClick}
            />
            <label htmlFor={`file-upload-${label}`}>
                {file ? (
                    <Avatar
                        src={previewUrl}
                        sx={{
                            width: 64,
                            height: 64,
                            marginBottom: '8px',
                        }}
                    />
                ) : (
                    <Button
                        component="span"
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            backgroundColor: '#e0e0e0',
                            color: '#000',
                            marginBottom: '8px'
                        }}
                    >
                        <AddIcon />
                    </Button>
                )}
            </label>
            <Box
                sx={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#666',
                    mb: '28px'
                }}
            >
                {label || 'Upload Image'}
            </Box>
        </Box>
    );
}

ImageUploadButton.propTypes = {
    onFileSelect: PropTypes.func.isRequired,
    label: PropTypes.string
};

export default ImageUploadButton;
