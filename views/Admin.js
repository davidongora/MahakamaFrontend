{/* <script> */}
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/config');
        const config = await response.json();

        const baseUrl = config.baseUrl;

        // Handle user input and fetch data
        const userInputField = document.getElementById('user_input');
        const userSendButton = document.getElementById('user-send-btn');
        const userChatMessages = document.getElementById('user-chat-messages');

        userSendButton.addEventListener('click', async () => {
            const userInput = userInputField.value;

            try {
                const response = await fetch(`${baseUrl}/combined_learning/${encodeURIComponent(userInput)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ topic: userInput })
                });

                if (response.ok) {
                    const data = await response.json();

                    // Clear previous responses
                    userChatMessages.innerHTML = '';

                    // Display the response in a more readable format
                    const responseContainer = document.createElement('div');
                    responseContainer.classList.add('response-container');

                    const learningProgramSection = document.createElement('div');
                    learningProgramSection.innerHTML = `<h3>Learning Program:</h3><p>${data.learning_program}</p>`;
                    responseContainer.appendChild(learningProgramSection);

                    if (data.wikipedia_content) {
                        const wikipediaSection = document.createElement('div');
                        wikipediaSection.innerHTML = `<h3>Wikipedia Content:</h3><p>${data.wikipedia_content}</p>`;
                        responseContainer.appendChild(wikipediaSection);
                    }

                    userChatMessages.appendChild(responseContainer);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });

        // Fetch list of files and display
        fetch(`${baseUrl}/listFiles`)
            .then(response => response.json())
            .then(data => {
                const fileList = document.getElementById('fileList');

                data.files.forEach(file => {
                    const listItem = document.createElement('li');
                    listItem.textContent = file;
                    fileList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching files:', error));

        // Handle file upload
        const fileUploadForm = document.getElementById('file-upload-form');
        const uploadMessage = document.getElementById('upload-message');

        fileUploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(fileUploadForm);
            const fileInput = document.getElementById('drop-files');
            formData.append('file', fileInput.files[0]);

            try {
                const response = await fetch(baseUrl + '/dropFiles', {
                    method: 'POST',
                    mode: 'cors',
                    body: formData
                });

                if (response.ok) {
                    uploadMessage.textContent = 'Files uploaded successfully.';
                    // Clear the message after a brief delay (3 seconds in this example)
                    setTimeout(() => {
                        uploadMessage.textContent = '';
                    }, 3000);
                } else {
                    uploadMessage.textContent = 'Failed to upload files.';
                    setTimeout(() => {
                        uploadMessage.textContent = '';
                    }, 3000);
                }
            } catch (error) {
                console.error('Error uploading files:', error);
            }
        });
    } catch (error) {
        console.error('Error fetching configuration:', error);
    }
});
{/* </script> */}