export const extractMetadata = (file) => {
    // Function to extract metadata from the uploaded file
    // This is a placeholder for actual metadata extraction logic
    const metadata = {
        title: '',
        semester: '',
        course: '',
        instructor: '',
        examNumber: '',
        examType: ''
    };

    // Logic to populate metadata based on the file content can be added here

    return metadata;
};

export const validateMetadata = (metadata) => {
    // Function to validate the extracted metadata
    const requiredFields = ['title', 'semester', 'course', 'instructor', 'examNumber'];
    for (const field of requiredFields) {
        if (!metadata[field]) {
            return false; // Validation fails if any required field is empty
        }
    }
    return true; // Validation passes if all required fields are filled
};