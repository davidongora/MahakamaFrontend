document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.headers.get('Content-Type').includes('application/json')) {
            const data = await response.json();

            const messageElement = document.getElementById('message');
            if (response.ok) {
                messageElement.classList.remove('text-red-500', 'bg-red-100', 'hidden'); // Remove error classes and hidden class
                messageElement.classList.add('text-green-500', 'bg-green-100'); // Add success classes
                messageElement.innerHTML = `<p>${data.message}</p>`;
                // Redirect to a new page after successful login
                window.location.href = data.redirectUrl; // Redirect to the URL provided by the server
            } else {
                messageElement.classList.add('text-red-500', 'bg-red-100'); // Add error classes
                messageElement.classList.remove('hidden'); // Remove hidden class
                messageElement.innerHTML = `<p>${data.message}</p>`;
            }
        } else {
            console.error('Response is not JSON');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});