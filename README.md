# Exam Search App

## Overview
The Exam Search App is a web application designed to allow users to upload images of exam papers and search for them using relevant metadata. The application extracts key information from the uploaded images to facilitate easy searching and organization of exam materials.

## Features
- **Search Bar**: Users can input search queries to find specific exams.
- **Upload Button**: Users can upload images of exams for processing.
- **Metadata Extraction**: Automatically extracts metadata from uploaded images to enhance searchability.
- **User Input for Metadata**: Users can complete additional metadata fields to improve search accuracy.

## Project Structure
```
exam-search-app
├── public
│   ├── index.html        # Main HTML document
│   ├── styles
│   │   └── main.css      # CSS styles for the application
│   └── scripts
│       └── app.js        # Main JavaScript logic
├── src
│   ├── components
│   │   ├── SearchBar.js  # Component for the search bar
│   │   └── UploadButton.js # Component for the upload button
│   └── utils
│       └── metadata.js    # Utility functions for metadata handling
└── README.md              # Project documentation
```

## Getting Started
1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/exam-search-app.git
   ```
2. **Navigate to the project directory**:
   ```
   cd exam-search-app
   ```
3. **Open the `public/index.html` file in a web browser** to view the application.

## Technologies Used
- HTML
- CSS
- JavaScript
- React (for components)

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.