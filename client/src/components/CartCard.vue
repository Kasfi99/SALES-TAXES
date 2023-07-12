<script>
import { useMainStore } from '../stores/counter';
export default {
    computed: {
        email() {
            return localStorage.getItem('email');
        },
        cart() {
            return useMainStore().selectedQuantities;
        },
    },
    methods: {
        clearCart() {
            useMainStore().clearCart();
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="card-top">
            <div style="display: flex;">

                <h5 class="text-top">Your Cart</h5>
                <button @click="clearCart()" type="button" class="my-button-primary">
                    Clear Cart
                </button>
            </div>
            <span v-if="!cart" class="cart-text">Add One Product Here!</span>
        </div>
        <table v-if="cart" class="table">
            <thead>
                <tr>
                    <th scope="col" class="table-header">No</th>
                    <th scope="col" class="table-header">Name</th>
                    <th scope="col" class="table-header">Quantity</th>
                    <th scope="col" class="table-header">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in cart" :key="index" class="table-row">
                    <th scope="row" class="table-cell">{{ index + 1 }}</th>
                    <td class="table-cell">{{ order.name }}</td>
                    <td class="table-cell">{{ order.quantity }}</td>
                    <td class="table-cell">${{ order.quantity * order.price }}</td>
                </tr>
            </tbody>
        </table>


    </div>
</template>

<style scoped>
.container {
    width: 390px;
    background-color: #fff;
    border-width: 1px;
    border-color: #e2e8f0;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.card-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
    margin-top: 20px;
}

.table {
    width: 380px;
    font-size: 0.875rem;
    text-align: left;
    color: #6b7280;
}

.text-top {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 500;
    color: #333333;
}

.cart-text {
    font-size: 0.875rem;
    color: #999999;
}

.table thead {
    color: #374151;
    text-transform: uppercase;
    background-color: #f9fafb;
    height: 20px;
}

.table tbody tr {
    background-color: #ffffff;
    border-bottom: 1px solid #d1d5db;
}

.table tbody tr:hover {
    background-color: #f9fafb;
}

.table th,
.table td {
    padding: 1rem 1.5rem;
}

.table th {
    font-weight: 500;
    color: #1f2937;
    white-space: nowrap;
}

.my-button-primary {
    height: 30px;
    width: 60px;
    background-color: #f22424;
    color: #ffffff;
    margin-left: 30px;
    border-radius: 5px;
    font-size: 11px;
    position: absolute;
    right: 10px;
}

.my-button-primary:hover {
    background-color: #a41b1b;
}
</style>