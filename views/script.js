// document.getElementById('loginForm').addEventListener('submit', async function(event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username, password })
//         });

//         if (response.headers.get('Content-Type').includes('application/json')) {
//             const data = await response.json();

//             const messageElement = document.getElementById('message');
//             if (response.ok) {
//                 messageElement.classList.remove('text-red-500', 'bg-red-100', 'hidden'); // Remove error classes and hidden class
//                 messageElement.classList.add('text-green-500', 'bg-green-100'); // Add success classes
//                 messageElement.innerHTML = `<p>${data.message}</p>`;
//                 // Redirect to a new page after successful login
//                 window.location.href = data.redirectUrl; // Redirect to the URL provided by the server
//             } else {
//                 messageElement.classList.add('text-red-500', 'bg-red-100'); // Add error classes
//                 messageElement.classList.remove('hidden'); // Remove hidden class
//                 messageElement.innerHTML = `<p>${data.message}</p>`;
//             }
//         } else {
//             console.error('Response is not JSON');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCAjhwJduEiYLgZEHtk_QnObApv-EuD6PI",
    authDomain: "http://cognifuseai-232ac.firebaseapp.com/",
    projectId: "cognifuseai-232ac",
    storageBucket: "http://cognifuseai-232ac.appspot.com/",
    messagingSenderId: "210495172549",
    appId: "1:210495172549:web:ab1723dcab540c0e93a5ac"
};

firebase.initializeApp(firebaseConfig);

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // Redirect to a new page after successful login
            window.location.href = './AdminSide.html'; // Redirect to the URL provided by the server
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            const messageElement = document.getElementById('message');
            messageElement.classList.add('text-red-500', 'bg-red-100'); // Add error classes
            messageElement.classList.remove('hidden'); // Remove hidden class
            messageElement.innerHTML = `<p>${errorMessage}</p>`;
        });
});