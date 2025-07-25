import React, { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import UploadButton from './components/UploadButton.jsx';
import MetadataForm from './components/MetadataForm.jsx';
import ResultsGrid from './components/ResultsGrid.jsx';
import { storage, db } from './firebase/config.js';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

function App() {
  // Estado para búsqueda
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState(null);
  // Estado para subida
  const [selectedFile, setSelectedFile] = useState(null);
  const [showMetadata, setShowMetadata] = useState(false);
  const [loading, setLoading] = useState(false);

  // Subida de archivo
  const handleFileSelected = (file) => {
    setSelectedFile(file);
    setShowMetadata(true);
  };

  // Guardar metadata y archivo
  const handleMetadataSubmit = async (metadata) => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      // Subir archivo a Storage
      const fileRef = storageRef(storage, `examenes/${Date.now()}_${selectedFile.name}`);
      await uploadBytes(fileRef, selectedFile);
      const fileURL = await getDownloadURL(fileRef);
      // Guardar metadata en Firestore
      await addDoc(collection(db, 'examenes'), {
        fecha: metadata.semester,
        docente: metadata.teacher,
        curso: metadata.course,
        parcial: metadata.examNumber,
        fileURL,
        nombreArchivo: selectedFile.name,
        timestamp: Timestamp.now()
      });
      alert('Examen y metadata subidos con éxito a Firebase.');
      setShowMetadata(false);
      setSelectedFile(null);
    } catch (error) {
      alert('Error al subir a Firebase: ' + error.message);
    }
    setLoading(false);
  };

  // Búsqueda
  const handleSearch = async () => {
    const searchTerm = queryText.trim().toLowerCase();
    if (!searchTerm) return;
    setLoading(true);
    try {
      const examenesRef = collection(db, 'examenes');
      // Buscar por curso (puedes ampliar a otros campos si lo deseas)
      const q = query(
        examenesRef,
        where('curso', '>=', searchTerm),
        where('curso', '<=', searchTerm + '\uf8ff')
      );
      const snapshot = await getDocs(q);
      const resultados = [];
      snapshot.forEach((doc) => {
        resultados.push({ id: doc.id, ...doc.data() });
      });
      setResults(resultados);
    } catch (error) {
      alert('Error al buscar: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Buscador de Exámenes</h1>
      <SearchBar query={queryText} setQuery={setQueryText} onSearch={handleSearch} />
      <UploadButton onFileSelected={handleFileSelected} />
      {showMetadata && (
        <MetadataForm onSubmit={handleMetadataSubmit} loading={loading} />
      )}
      <ResultsGrid results={results} />
    </div>
  );
}

export default App; 