import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Byt ut detta block mot ditt EGET från Firebase!
const firebaseConfig = {
  apiKey: "DIN_API_NYCKEL",
  authDomain: "ditt-projekt.firebaseapp.com",
  projectId: "ditt-projekt",
  storageBucket: "ditt-projekt.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Starta upp Firebase och Databasen
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Detta är funktionen som skickar texten till molnet
window.saveToCloud = async function(textenSomSkaSparas) {
    try {
        // Vi skapar ett dokument som heter "mitt_manus" i mappen "manuskript"
        const docRef = doc(db, "manuskript", "mitt_manus");
        
        await setDoc(docRef, {
            innehall: textenSomSkaSparas,
            senastSparad: serverTimestamp()
        }, { merge: true }); // Merge uppdaterar texten utan att radera inställningar
        
        console.log("✅ Texten är sparad i molnet!");
    } catch (e) {
        console.error("❌ Fel vid sparning till molnet: ", e);
    }
};