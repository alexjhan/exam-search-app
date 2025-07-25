import React from 'react';

const ResultsGrid = ({ results }) => {
  if (!results) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {results.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">No se encontraron resultados</p>
      ) : (
        results.map((exam) => (
          <div key={exam.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={exam.fileURL} alt="Vista previa del examen" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">{exam.curso}</h3>
            <p className="text-sm text-gray-600">Profesor: {exam.docente}</p>
            <p className="text-sm text-gray-600">Fecha: {exam.fecha}</p>
            <p className="text-sm text-gray-600">Parcial: {exam.parcial}</p>
            <a href={exam.fileURL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Ver Examen
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default ResultsGrid; 