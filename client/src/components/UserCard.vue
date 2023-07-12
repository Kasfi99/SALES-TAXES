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
    <div style="width: 500px;"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10 mt-4">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="../assets/profile_example.gif" alt="Bonnie image" />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Hi! {{ email }}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">Nice to see you, today.</span>
        </div>
    </div>
</template>