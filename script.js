 
const HF_API_TOKEN = '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'; // Replace with your token
const MODEL_NAME = 'stabilityai/stable-diffusion-xl-base-1.0';

// Update your generateImage function in script.js
async function generateImage() {
    const prompt = document.getElementById('promptInput').value;
    const resultContainer = document.getElementById('resultContainer');
    const loading = document.getElementById('loading');
    const generateBtn = document.querySelector('.generate-btn');

    if (!prompt) {
        alert('Please enter a prompt');
        return;
    }

    // Add generating state
    generateBtn.classList.add('generating');
    generateBtn.disabled = true;
    loading.style.display = 'block';
    resultContainer.innerHTML = '';

    try {
        const response = await fetch(
            `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${HF_API_TOKEN}`
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        width: 512,
                        height: 512
                    }
                }),
            }
        );
// script.js - Update loading state handling
async function generateImage() {
    // Existing code
    
    // Show loading screen
    loading.style.display = 'flex'; // Changed to flex
    
    try {
        // Existing API call
    } catch (error) {
        // Error handling
    } finally {
        loading.style.display = 'none';
        // Rest of code
    }
}

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        
        resultContainer.innerHTML = `<img src="${imgUrl}" alt="Generated Image">`;
        resultContainer.querySelector('img').style.animation = 'fadeIn 0.5s ease-out';
    } catch (error) {
        console.error('Error:', error);
        resultContainer.innerHTML = '<div class="error">ðŸš¨ Error generating image. Please try again.</div>';
    } finally {
        generateBtn.classList.remove('generating');
        generateBtn.disabled = false;
        loading.style.display = 'none';
    }
}

// Add input animation
document.getElementById('promptInput').addEventListener('input', function() {
    this.style.transform = this.value ? 'scale(1.02)' : 'scale(1)';
});