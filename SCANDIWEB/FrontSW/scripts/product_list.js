const productListElement = document.getElementById('product-list');
const deleteButton = document.getElementById('delete-product-btn');

async function fetchProducts() {
    try {
        const response = await fetch('https://adnan-app.shop/index.php/scandiweb/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();

        productListElement.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const entries = Object.entries(product);
            const lastEntry = entries[entries.length - 1];
            
            productCard.innerHTML = `
                <input type="checkbox" class="delete-checkbox" data-id="${product.ID}">
                <div class="product-info">
                    <p><strong>${product.SKU}</strong></p>
                    <p>${product.Name}</p>
                    <p>${product.Price}</p>
                    <p>${lastEntry[0]}: ${lastEntry[1]}</p>
                </div>
            `;
            productListElement.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        alert(`Error fetching products: ${error.message}`);
    }
}


async function deleteProducts() {
    const checkboxes = document.querySelectorAll('.delete-checkbox:checked');
    const idsToDelete = Array.from(checkboxes).map(cb => cb.dataset.id);

    if (idsToDelete.length === 0) {
        alert('No products selected for deletion.');
        return;
    }

    try {
        const response = await fetch('https://adnan-app.shop/index.php/scandiweb/products/delete', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: idsToDelete }),
        });

        if (response.ok) {
            alert('Selected products deleted successfully.');
            fetchProducts();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Failed to delete products.');
        }
    } catch (error) {
        console.error('Error deleting products:', error);
        alert('Error deleting products: ' + error.message);
    }
}
document.getElementById('add-product-btn').addEventListener('click', function() {
    window.location.href = '/add-product';
});

deleteButton.addEventListener('click', deleteProducts);
window.onload = fetchProducts;
