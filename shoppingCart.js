const prompt = require('prompt');

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    async addItems() {
        console.log('Please add items to your shopping cart:');
        for (let i = 0; i < 3; i++) {
            const newItem = await this.promptItem();
            this.items.push(newItem);
        }
    }

    async promptItem() {
        prompt.start();
        const newItem = await new Promise((resolve, reject) => {
            prompt.get(['name', 'price', 'quantity'], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return newItem;
    }

    displayItems() {
        console.log('Items in your shopping cart:');
        this.items.forEach((item, index) => {
            console.log(`${index + 1}. Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`);
        });
    }

    async updateItem() {
        console.log('Please select an item to update:');
        const index = await this.promptIndex();
        const updatedItem = await this.promptItem();
        this.items[index - 1] = updatedItem;
        console.log('Item updated successfully.');
    }

    async deleteItem() {
        console.log('Please select an item to delete:');
        const index = await this.promptIndex();
        this.items.splice(index - 1, 1);
        console.log('Item deleted successfully.');
    }

    promptIndex() {
        return new Promise((resolve, reject) => {
            prompt.get(['index'], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(parseInt(result.index));
                }
            });
        });
    }

    calculateTotalPrice() {
        const totalPrice = this.items.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);
        console.log(`Total price of items: ${totalPrice}`);
    }
}

module.exports = { ShoppingCart };
