export class ShoppingCart {
    private items: { name: string; quantity: number; price: number }[] = [];

    async addProduct(name: string, quantity: number) {
        if (quantity <= 0 || !Number.isInteger(quantity)) {
            throw new Error(`Invalid quantity: ${quantity}. Must be a positive integer.`);
        }
    
        const price = await this.fetchProductPrice(name);
        const existingItem = this.items.find(item => item.name === name);
    
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ name, price, quantity });
        }
    }
    

    private async fetchProductPrice(name: string): Promise<number> {
        const response = await fetch('http://localhost:3001/products/${name}');
    
        if(!response.ok) {
            throw new Error('Failed to fetch price for ${name}');
        }
    
        const data = await response.json();
        return data.price;
    }

    getCartState() {
        const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = Math.round(subtotal * 0.125 * 100) / 100;
        const total = Math.round((subtotal + tax) * 100) / 100;
    
        return {
            items: this.items,
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
        };
    }
    
    }


