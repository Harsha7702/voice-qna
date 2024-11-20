const button = document.getElementById('customButton');

button.addEventListener('click', () => {
    // Greeting
    const greeting = new SpeechSynthesisUtterance("Hi! How can I help you?");
    window.speechSynthesis.speak(greeting);

    // Start listening
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = async (event) => {
        const question = event.results[0][0].transcript;

        // Send question to backend
        const response = await fetch('http://localhost:3000/process-speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });

        const data = await response.json();

        // Speak the response
        const answer = new SpeechSynthesisUtterance(data.answer);
        window.speechSynthesis.speak(answer);
    };

    recognition.onerror = (err) => {
        console.error('Speech recognition error:', err);
    };

    recognition.start();
});
