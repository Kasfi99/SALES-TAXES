<script>
import { useMainStore } from '../stores/counter';

export default {
    data() {
        return {
            dataInput: {
                name: null,
                quantity: null,
                price: null,
            },
            Validation: {
                nameInput: false,
                quantityInput: false,
                priceInput: false,
            },
        };
    },
    computed: {
        showModal() {
            return useMainStore().showModal;
        },
        getCalulatedOrders() {
            return useMainStore().showCalculation;
        },
    },
    methods: {
        toggleModal() {
            useMainStore().toggleModal();
            console.log(this.showModal, '<<< show modal')
        },
        confirmMyOrder(datataxes) {
            useMainStore().confirmMyOrder(datataxes)
        }
    },
};
</script>

<template>
    <div v-if="showModal">
        <div
            class="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
            <div class="container-top">
                <div class="content-container">
                    <h3 class="modal-heading">Your Total</h3>
                    <form @submit.prevent="confirmMyOrder(getCalulatedOrders)" class="form-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col" class="table-header">No</th>
                                    <th scope="col" class="table-header">Product Name</th>
                                    <th scope="col" class="table-header">Order Quantity</th>
                                    <th scope="col" class="table-header">Price Per Pieces</th>
                                    <th scope="col" class="table-header">Tax Per Pieces</th>
                                    <th scope="col" class="table-header">Total Per Product</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(order, index) in getCalulatedOrders?.productSales" :key="index"
                                    class="table-row">
                                    <th scope="row" class="table-cell">{{ index + 1 }}</th>
                                    <td class="table-cell">{{ order?.name }}</td>
                                    <td class="table-cell">{{ order?.quantity }}</td>
                                    <td class="table-cell">${{ order?.price }}</td>
                                    <td class="table-cell">${{ order?.salesTax }}</td>
                                    <td class="table-cell">${{ order?.productPriceAfterTax }}</td>
                                </tr>
                                <tr class="table-row">
                                    <td class="table-cell">Total Amount: </td>
                                    <td class="table-cell"></td>
                                    <td class="table-cell"></td>
                                    <td class="table-cell"></td>
                                    <td class="table-cell">${{ getCalulatedOrders?.salesTaxes }}</td>
                                    <td class="table-cell">${{ getCalulatedOrders?.totalPrice }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="button-container">
                            <button @click="toggleModal()" class="button-cancel">Cancel</button>
                            <button type="submit" class="button">Confirm
                                Order</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-container {
    width: 100%;
    max-width: 500px;
}

.container-top {
    position: relative;
    width: 1000px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.content-container {
    padding: 20px;
}

.modal-heading {
    margin-bottom: 4rem;
    font-size: 1.5rem;
}

.form-container {
    margin-bottom: 4rem;
}

.button {
    width: 150px;
    background-color: blue;
    color: white;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
}

.button-cancel {
    width: 150px;
    background-color: red;
    color: white;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
}

.button-container {
    display: flex;
    width: 100%;
    gap: 20px;
    margin-top: 20px;

}

.table {
    width: 100%;
    font-size: 0.875rem;
    text-align: left;
    color: #6b7280;
    margin-top: -50px;
}

.table-header {
    font-size: 0.75rem;
    color: #374151;
    text-transform: uppercase;
    background-color: #f9fafb;
}

.table-row {
    background-color: #ffffff;
    border-bottom: 1px solid #d1d5db;
}

.table-row:hover {
    background-color: #f9fafb;
}

.table-cell {
    padding: 1rem 1.5rem;
}

.table-cell:first-child {
    font-weight: 500;
    color: #1f2937;
    white-space: nowrap;
}
</style>