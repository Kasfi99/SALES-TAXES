<script>
import { useMainStore } from '../stores/counter';
import ModalVue from '../components/Modal.vue';

export default {
    data() {
        return {
            search: '',
            selectedQuantities: []
        };
    },
    computed: {
        filteredOrders() {
            return this.getOrdersData?.slice().sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                return nameA.localeCompare(nameB);
            }).filter((order) => {
                return (
                    order.category.toLowerCase().includes(this.search.toLowerCase()) ||
                    order.name.toLowerCase().includes(this.search.toLowerCase())
                );
            });
        },
        getOrdersData() {
            return useMainStore().order;
        },
        isLogged() {
            return useMainStore().isLogged;
        },
        getModalStatus() {
            return useMainStore().showModal;
        }
    },
    components: {
        ModalVue,
    },
    methods: {
        fetchOrder() {
            return useMainStore().fetchData();
        },
        decrementQuantity(order) {
            const index = this.selectedQuantities.findIndex(item => item.id === order.id);
            if (index !== -1) {
                if (this.selectedQuantities[index].quantity > 0) {
                    this.selectedQuantities[index].quantity--;
                }
            }
        },
        incrementQuantity(order) {
            const index = this.selectedQuantities.findIndex(item => item.id === order.id);
            if (index !== -1) {
                if (this.selectedQuantities[index].quantity < order.quantity) {
                    this.selectedQuantities[index].quantity++;
                }
            } else {
                this.selectedQuantities.push({ ...order, quantity: 1 });
            }
        },
        addToCart(order) {
            const selectedQuantity = this.selectedQuantities.find(
                (quantity) => quantity.id === order.id
            );

            if (selectedQuantity) {
                if (selectedQuantity.quantity > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Add Succesfully",
                        text: `Added ${selectedQuantity.quantity} ${order.name} to the cart`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Add Succesfully",
                        text: `Added ${selectedQuantity.quantity} ${order.name} to the cart`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No Quantity Selected",
                    text: `Please select a quantity for ${order.name}`
                });
            }

            this.sendSelectedQuantity(this.selectedQuantities)
            console.log(`Added ${order.name} to the cart`, this.selectedQuantities);
        },
        sendSelectedQuantity(order) {
            return useMainStore().sendSelectedQuantities(order)
        },
        getSelectedQuantity(order) {
            const selectedQuantity = this.selectedQuantities.find(
                (quantity) => quantity.id === order.id
            );
            return selectedQuantity ? selectedQuantity.quantity : 0;
        },
        async calculateMyTaxes(dataInput) {
            await useMainStore().calculateReceipt(dataInput);
        }
    },
    created() {
        try {
            this.fetchOrder();
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<template>
    <div>
        <ModalVue />
        <div class="table-container">
            <div class="table-content">
                <label for="table-search" class="sr-only">Search</label>
                <div class="search-input-container">
                    <input v-model="search" type="text" id="table-search" class="search-input"
                        placeholder="Search by product name or category" />
                </div>
                <button @click="calculateMyTaxes(selectedQuantities)" type="button" class="my-button-top my-button-primary">
                    Calculate My Tax now!
                </button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" class="table-header">No</th>
                        <th scope="col" class="table-header">Product Name</th>
                        <th scope="col" class="table-header">Product Category</th>
                        <th scope="col" class="table-header">Product Origin</th>
                        <th scope="col" class="table-header">Product Quantity</th>
                        <th scope="col" class="table-header">Product Price</th>
                        <th scope="col" class="table-header">Add to My Cart</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in filteredOrders" :key="index" class="table-row">
                        <th scope="row" class="table-cell">{{ index + 1 }}</th>
                        <td class="table-cell">{{ order.name }}</td>
                        <td class="table-cell">{{ order.category }}</td>
                        <td class="table-cell">{{ order.origin }}</td>
                        <td class="table-cell">{{ order.quantity }}</td>
                        <td class="table-cell">${{ order.price }}</td>
                        <td class="table-cell">
                            <button class="my-button my-button-minus" @click="decrementQuantity(order)">
                                -
                            </button>
                            <span>{{ getSelectedQuantity(order) }}</span>
                            <button class="my-button my-button-add" @click="incrementQuantity(order)">
                                +
                            </button>
                            <button class="my-button my-button-cart" @click="addToCart(order)">
                                Add to Cart
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<style>
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

.search-input {
    margin-bottom: 0.5rem;
    padding: 0.5rem 2.5rem 0.5rem 0.5rem;
    font-size: 0.875rem;
    color: #1f2937;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    width: 20rem;
    outline: none;
}

.search-input-container {
    position: relative;
    margin-top: 1rem;
}

.search-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

.table {
    width: 100%;
    font-size: 0.875rem;
    text-align: left;
    color: #6b7280;
}

.table thead {
    font-size: 0.75rem;
    color: #374151;
    text-transform: uppercase;
    background-color: #f9fafb;
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

.my-button {
    /* ... */
    padding: 0.625rem;
    border-radius: 20%;
    font-size: 1rem;
}

.my-button-minus {
    background-color: red;
    color: white;
    margin-right: 15px;
}

.my-button-add {
    background-color: rgb(150, 60, 150);
    color: white;
    margin-left: 15px;
}

.my-button-top {
    display: inline-block;
    margin-left: 40px;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.625rem 1.25rem;
    border-radius: 0.375rem;
    text-align: center;
    cursor: pointer;
    outline: none;
}

.my-button-primary {
    background-color: #8b5cf6;
    color: #ffffff;
}

.my-button-primary:hover {
    background-color: #7c3aed;
}
</style>