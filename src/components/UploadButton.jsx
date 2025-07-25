import React, { useRef } from 'react';

const UploadButton = ({ onFileSelected }) => {
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mb-8">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mb-4"
          onClick={handleButtonClick}
        >
          Subir Examen
        </button>
        <p className="text-gray-500">o arrastra y suelta aquí</p>
      </div>
    </div>
  );
};

export default UploadButton; 