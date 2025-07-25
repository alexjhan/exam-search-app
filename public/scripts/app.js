// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC22wDeEUDlpRjcXuXcPOMe_7LDnrN3NI0",
  authDomain: "examenes-anteriores-a3d3e.firebaseapp.com",
  projectId: "examenes-anteriores-a3d3e",
  storageBucket: "examenes-anteriores-a3d3e.appspot.com",
  messagingSenderId: "774148031433",
  appId: "1:774148031433:web:6804ae52c25e8418705e18",
  measurementId: "G-3RQ89E2KNL"
};

// Inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// Lógica principal para mostrar el formulario de metadatos al subir un archivo

document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');
    const metadataContainer = document.getElementById('metadata-container');
    const metadataForm = document.getElementById('metadata-form');
    let selectedFile = null;

    // Al hacer clic en el botón, activar el input de archivo
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    // Configuración del Drag and Drop
    const dropZone = document.querySelector('.border-dashed');
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-blue-500');
        dropZone.classList.add('bg-blue-50');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-blue-500');
        dropZone.classList.remove('bg-blue-50');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-blue-500');
        dropZone.classList.remove('bg-blue-50');
        
        if (e.dataTransfer.files.length > 0) {
            selectedFile = e.dataTransfer.files[0];
            metadataContainer.classList.remove('hidden');
        }
    });

    // Cuando se selecciona un archivo, mostrar el formulario de metadatos
    fileInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            selectedFile = event.target.files[0];
            metadataContainer.classList.remove('hidden');
        }
    });

    // Manejar el envío del formulario de metadatos
    metadataForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Por favor selecciona un archivo.');
            return;
        }
        const fecha = document.getElementById('semester').value;
        const docente = document.getElementById('teacher').value;
        const curso = document.getElementById('course').value;
        const parcial = document.getElementById('exam-number').value;

        try {
            console.log('Iniciando subida del archivo:', selectedFile.name);
            // Subir archivo a Firebase Storage
            const fileRef = storageRef(storage, `examenes/${Date.now()}_${selectedFile.name}`);
            console.log('Subiendo archivo a Firebase Storage...');
            await uploadBytes(fileRef, selectedFile);
            console.log('Archivo subido exitosamente, obteniendo URL...');
            const fileURL = await getDownloadURL(fileRef);
            console.log('URL del archivo:', fileURL);

            // Guardar metadata en Firestore
            await addDoc(collection(db, "examenes"), {
                fecha,
                docente,
                curso,
                parcial,
                fileURL,
                nombreArchivo: selectedFile.name,
                timestamp: new Date()
            });

            alert('Examen y metadata subidos con éxito a Firebase.');
        } catch (error) {
            alert('Error al subir a Firebase: ' + error.message);
        }
        metadataForm.reset();
        metadataContainer.classList.add('hidden');
        fileInput.value = '';
        selectedFile = null;
    });

    // Lógica del buscador
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            try {
                // Crear consulta para buscar en diferentes campos
                const examenesRef = collection(db, "examenes");
                const q = query(examenesRef, 
                    where("curso", ">=", searchTerm),
                    where("curso", "<=", searchTerm + '\uf8ff')
                );
                
                const snapshot = await getDocs(q);
                const resultados = [];
                
                snapshot.forEach((doc) => {
                    resultados.push({ id: doc.id, ...doc.data() });
                });

                // Mostrar resultados
                mostrarResultados(resultados);
            } catch (error) {
                console.error("Error en la búsqueda:", error);
                alert("Error al realizar la búsqueda");
            }
        }
    });
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Función para mostrar los resultados de la búsqueda
    function mostrarResultados(resultados) {
        const contenedor = document.createElement('div');
        contenedor.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8';

        if (resultados.length === 0) {
            contenedor.innerHTML = '<p class="text-center col-span-full text-gray-500">No se encontraron resultados</p>';
        } else {
            resultados.forEach(exam => {
                const card = document.createElement('div');
                card.className = 'bg-white rounded-lg shadow-md p-4';
                card.innerHTML = `
                    <img src="${exam.fileURL}" alt="Vista previa del examen" class="w-full h-48 object-cover rounded-lg mb-4">
                    <h3 class="text-lg font-semibold mb-2">${exam.curso}</h3>
                    <p class="text-sm text-gray-600">Profesor: ${exam.docente}</p>
                    <p class="text-sm text-gray-600">Fecha: ${exam.fecha}</p>
                    <p class="text-sm text-gray-600">Parcial: ${exam.parcial}</p>
                    <a href="${exam.fileURL}" target="_blank" class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        Ver Examen
                    </a>
                `;
                contenedor.appendChild(card);
            });
        }

        // Limpiar resultados anteriores y mostrar los nuevos
        const resultadosAnteriores = document.querySelector('.grid');
        if (resultadosAnteriores) {
            resultadosAnteriores.remove();
        }
        document.querySelector('.container').appendChild(contenedor);
    }
});