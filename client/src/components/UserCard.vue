<script>
import { useMainStore } from '../stores/counter';
export default {
    computed: {
        email() {
            return localStorage.getItem('email');
        },
        userOrders() {
            const userOrder = useMainStore().order;
            const email = this.email;
            let count = 0;
            for (const orderId in userOrder) {
                const order = userOrder[orderId];
                if (email === order.User.email) {
                    count++;
                }
            }
            return count;
        },
        userTotal() {
            const userOrder = useMainStore().order;
            const email = this.email;
            let total = 0;
            for (const orderId in userOrder) {
                const order = userOrder[orderId];
                if (email === order.User.email) {
                    total += order.Product.quantity * order.Product.price;
                }
            }
            return total;
        },
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(amount);
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="card-top">
            <img class="image" src="../assets/profile_example.gif" alt="Bonnie image" />
            <h5 class="text-top">Hi! {{ email }}</h5>
            <span class="cart-text">Nice to see you, today.</span>
        </div>
    </div>
</template>

<style scoped>
.image {
    width: 6rem;
    height: 6rem;
    margin-bottom: 0.75rem;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

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
</style>