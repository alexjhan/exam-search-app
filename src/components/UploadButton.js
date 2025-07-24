import React from 'react';

const UploadButton = ({ onUpload }) => {
    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div>
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleUpload} 
                style={{ display: 'none' }} 
                id="upload-button" 
            />
            <label htmlFor="upload-button" style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px' }}>
                Subir Examen
            </label>
        </div>
    );
};

export default UploadButton;