
// Firebase config setup (Replace with your Firebase config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase initialization
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Upload Logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('uploadForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const subject = document.getElementById('subject').value;
      const semester = document.getElementById('semester').value;
      const uploader = document.getElementById('uploader').value;
      const file = document.getElementById('fileInput').files[0];

      const storageRef = storage.ref(`notes/${semester}/${subject}/${file.name}`);
      await storageRef.put(file);
      const url = await storageRef.getDownloadURL();

      await db.collection("notes").add({ subject, semester, uploader, fileName: file.name, url, timestamp: Date.now() });
      alert("Upload successful!");
      form.reset();
    });
  }
});
