function analyzeImage() {
    const imageUrl = document.getElementById('imageUrl').value;
    const subscriptionKey = 'b3c53c40697d4359b12ea1fe58d2196f';
    const endpoint = 'https://mingdio.cognitiveservices.azure.com/';
    const uriBase = endpoint + '/vision/v3.2/analyze';

    fetch(`${uriBase}?visualFeatures=Description`, {
        method: 'POST',
        body: JSON.stringify({ url: imageUrl }),
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.description && data.description.captions.length > 0) {
            const description = data.description.captions[0].text;
            document.getElementById('imageDescription').innerText = '描述: ' + description;
        } else {
            document.getElementById('imageDescription').innerText = '未找到描述。';
        }
    })
    .catch(error => {
        console.error('错误:', error);
        document.getElementById('imageDescription').innerText = '分析图像时出错。';
    });
}
