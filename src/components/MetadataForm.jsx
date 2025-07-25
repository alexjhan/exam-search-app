import React, { useState } from 'react';

const MetadataForm = ({ onSubmit, loading }) => {
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [teacher, setTeacher] = useState('');
  const [examNumber, setExamNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ semester, course, teacher, examNumber });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Completa la Metadata</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">Semestre:</label>
          <input
            type="text"
            id="semester"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={semester}
            onChange={e => setSemester(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Curso:</label>
          <input
            type="text"
            id="course"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={course}
            onChange={e => setCourse(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="teacher" className="block text-sm font-medium text-gray-700 mb-1">Docente:</label>
          <input
            type="text"
            id="teacher"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={teacher}
            onChange={e => setTeacher(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="exam-number" className="block text-sm font-medium text-gray-700 mb-1">Número de Examen:</label>
          <input
            type="text"
            id="exam-number"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={examNumber}
            onChange={e => setExamNumber(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Metadata'}
        </button>
      </form>
    </div>
  );
};

export default MetadataForm; 