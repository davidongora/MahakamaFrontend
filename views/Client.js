{/* <script> */}
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/config');
        const config = await response.json();
        const baseUrl = config.baseUrl;

        fetch(baseUrl + '/listFiles')
            .then(response => response.json())
            .then(data => {
                const fileList = document.getElementById('fileList');
                fileList.innerHTML = ''; 

                data.files.forEach(file => {
                    const listItem = document.createElement('li');
                    listItem.textContent = file;
                    fileList.appendChild(listItem);
                });

                const fileOptions = document.getElementById('fileOptions');
                data.files.forEach(file => {
                    const option = document.createElement('option');
                    option.value = file;
                    fileOptions.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching files:', error));

        document.getElementById('user-send-btn').addEventListener('click', async () => {
            const userInput = document.getElementById('user_input').value;
            const documentName = document.getElementById('document-name-input').value;
            const responseContainer = document.getElementById('user-chat-messages');

            const userInputElement = document.createElement('p');
            userInputElement.textContent = `ME: ${userInput}`;
            userInputElement.style.color = 'blue';
            responseContainer.appendChild(userInputElement);

            try {
                const response = await fetch(baseUrl + '/answerquestions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `user_input=${encodeURIComponent(userInput)}&document_name=${encodeURIComponent(documentName)}`
                });

                if (!response.ok) {
                    throw new Error('Request failed');
                }

                const data = await response.json();

                const imageElement = document.createElement('img');
                imageElement.src = '/img/chat.png'; 
                responseContainer.appendChild(imageElement);

                const responseElement = document.createElement('p');
                responseElement.textContent = `Chatbot Response: ${data.chatbot_response}`;

                responseElement.classList.add('fade-in');
                responseContainer.appendChild(responseElement);

                responseElement.addEventListener('animationend', () => {
                    responseElement.classList.remove('fade-in');
                });
            } catch (error) {
                console.error('Error fetching response:', error);
                const errorElement = document.createElement('p');
                errorElement.textContent = "Hey there! I'm still honing my skills, aiming to give you the best answers soon! Even though I'm learning, your curiosity fuels my growth. Keep those questions coming, and I'll strive to provide even better responses. Together, we're on a journey towards smarter interactions!";
                responseContainer.appendChild(errorElement);
            }
        });
    } catch (error) {
        console.error('Error fetching configuration:', error);
    }
});
{/* </script> */}
