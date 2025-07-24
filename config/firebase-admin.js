const admin = require('firebase-admin');
const path = require('path');

// Inicializar Firebase Admin con las credenciales
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "examenes-anteriores-a3d3e.appspot.com"
});

// Exportar las instancias que necesitamos
const db = admin.firestore();
const storage = admin.storage();

module.exports = {
    admin,
    db,
    storage
};
