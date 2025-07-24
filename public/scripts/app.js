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
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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
        const fecha = document.getElementById('fecha').value;
        const docente = document.getElementById('docente').value;
        const curso = document.getElementById('curso').value;
        const parcial = document.getElementById('parcial').value;

        try {
            // Subir archivo a Firebase Storage
            const fileRef = storageRef(storage, `examenes/${Date.now()}_${selectedFile.name}`);
            await uploadBytes(fileRef, selectedFile);
            const fileURL = await getDownloadURL(fileRef);

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

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Buscando:', query);
            // Aquí puedes agregar la lógica real de búsqueda
        }
    });
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});