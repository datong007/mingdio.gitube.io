function sendImageToAzure() {
    const imageUrl = document.getElementById('imageUrl').value;
    const subscriptionKey = 'b3c53c40697d4359b12ea1fe58d2196f';  // 确保替换为正确的密钥
    const endpoint = 'https://mingdio.cognitiveservices.azure.com/';  // 确保替换为正确的终端地址
    const uriBase = endpoint + '/vision/v3.1/analyze';

    fetch(`${uriBase}?visualFeatures=Description,Tags,Color`, {
        method: 'POST',
        body: JSON.stringify({ url: imageUrl }),
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        console.log(data);  // 在控制台打印响应数据
        document.getElementById('description').textContent = data.description.captions[0].text;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('description').textContent = 'Failed to analyze image.';
    });
}
