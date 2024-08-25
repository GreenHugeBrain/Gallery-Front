document.addEventListener('DOMContentLoaded', () => {
    // Check if the token is in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        // If token is not found, redirect to index.html
        window.location.href = 'index.html';
        return;
    }

    // Token exists, proceed with the upload form functionality
    document.getElementById('uploadForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch('https://test-api-oa1w.onrender.com/images-render/images', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`  // Include the token in the request header
                }
            });

            const result = await response.json();
            if (response.ok) {
                alert('Image uploaded successfully!');
                event.target.reset();
            } else {
                alert('Error: ' + result.error);
                console.log(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the image.');
        }
    });
});
