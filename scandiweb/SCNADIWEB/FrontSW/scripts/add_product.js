document.getElementById('save-product-btn').addEventListener('click', function(event) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';

    const sku = document.getElementById('sku').value.trim();
    const name = document.getElementById('name').value.trim();
    const price = document.getElementById('price').value.trim();
    const productType = document.getElementById('productType').value;
    const size = document.getElementById('size').value.trim();
    const weight = document.getElementById('weight').value.trim();
    const height = document.getElementById('height').value.trim();
    const width = document.getElementById('width').value.trim();
    const length = document.getElementById('length').value.trim();
    let isValid = true;
    let alertMessage = '';

    if (!sku || !name || !price || !productType) {
        errorMessageDiv.textContent = "Please, submit required data";
        errorMessageDiv.style.display = 'block';
        return;
    }

    if (isNaN(parseFloat(price))) {
        alertMessage = "Please, provide the data of indicated type for Price";
        isValid = false;
    }

    if (productType === "DVD") {
        if (!size || isNaN(parseFloat(size))) {
            alertMessage = "Please, provide the data of indicated type for Size";
            isValid = false;
        }
    } else if (productType === "Book") {
        if (!weight || isNaN(parseFloat(weight))) {
            alertMessage = "Please, provide the data of indicated type for Weight";
            isValid = false;
        }
    } else if (productType === "Furniture") {
        if (!height || !width || !length || isNaN(parseFloat(height)) || isNaN(parseFloat(width)) || isNaN(parseFloat(length))) {
            alertMessage = "Please, provide the data of indicated type for Dimensions";
            isValid = false;
        }
    }

    if (!isValid) {
        errorMessageDiv.textContent = alertMessage;
        errorMessageDiv.style.display = 'block';
        return;
    }

    const formData = {
        sku,
        name,
        price: parseFloat(price),
        product_type: productType
    };

    if (productType === "DVD") {
        formData.size = parseFloat(size);
    } else if (productType === "Book") {
        formData.weight = parseFloat(weight);
    } else if (productType === "Furniture") {
        formData.dimensions = `${height}x${width}x${length}`;
    }

    fetch('http://adnan-app.infinityfreeapp.com/index.php/scandiweb/products/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
          if (!data.success) {
            errorMessageDiv.textContent = data.message || 'SKU already exists or invalid data';
            errorMessageDiv.style.display = 'block';
            return;
        }
        
    }).then(data => {
    window.location.href = '/';
})
    .catch(error => {
        errorMessageDiv.textContent = 'Error saving product: ' + error.message;
        errorMessageDiv.style.display = 'block';
    });
});



document.getElementById('cancel-btn').addEventListener('click', function() {
    window.location.href = '/';
});

document.getElementById('productType').addEventListener('change', function() {
    const selectedType = this.value;
    const descriptionElement = document.getElementById('attribute-description');
    
    document.getElementById('sizeField').classList.toggle('hidden', selectedType !== 'DVD');
    document.getElementById('weightField').classList.toggle('hidden', selectedType !== 'Book');
    document.getElementById('dimensionsField').classList.toggle('hidden', selectedType !== 'Furniture');
    
    if (selectedType === 'DVD') {
        descriptionElement.textContent = "Please, provide size in MB";
    } else if (selectedType === 'Book') {
        descriptionElement.textContent = "Please, provide weight in Kg";
    } else if (selectedType === 'Furniture') {
        descriptionElement.textContent = "Please, provide dimensions (HxWxL) in cm";
    } else {
        descriptionElement.textContent = "";
    }
});