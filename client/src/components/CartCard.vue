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
};
</script>

<template>
    <div style="width: 500px;"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10 mt-4">
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Your Cart</h5>
            <span v-if="!cart" class="text-sm text-gray-500 dark:text-gray-400">Add One Product Here!</span>

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
.table-container {
    position: relative;
    overflow-x: auto;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 0.375rem;
}

.table-content {
    padding-bottom: 1rem;
    background-color: #ffffff;
    display: flex;
}

.table {

    font-size: 0.875rem;
    text-align: left;
    color: #6b7280;
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
</style>