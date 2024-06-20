const socket = io();

socket.on('productAdded', (product) => {
    const productContainer = document.getElementById('products-container');
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <button class="add-to-cart" data-product-id="${product._id}">Agregar al Carrito</button>
    `;
    productContainer.appendChild(productItem);
    
    // Añadir evento al nuevo botón
    productItem.querySelector('.add-to-cart').addEventListener('click', async (event) => {
        const productId = event.target.dataset.productId;
        const userId = 'id_del_usuario'; // Reemplaza con el ID del usuario autenticado
        const response = await fetch(`/api/carts/${userId}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity: 1 }),
        });
        const result = await response.json();
        if (result.status === 'success') {
            alert('Producto agregado al carrito');
        } else {
            alert('Error al agregar el producto al carrito');
        }
    });
});
