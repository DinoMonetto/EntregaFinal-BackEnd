const socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor de WebSocket');
});

socket.on('products', (products) => {
    const productList = document.getElementById('products-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.title} - ${product.price}`;
        productList.appendChild(listItem);
    });
});
