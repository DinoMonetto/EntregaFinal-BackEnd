import fs from 'fs/promises';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async addCart(cart) {
        const carts = await this.getCarts();
        carts.push(cart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

    async deleteCart(cartId) {
        let carts = await this.getCarts();
        carts = carts.filter(c => c.id !== cartId);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }
}

export default CartManager;
