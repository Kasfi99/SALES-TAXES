<script>
import Table from '../components/Table.vue';
import Card from '../components/UserCard.vue';
import Cart from '../components/CartCard.vue';
import Footer from '../components/Footer.vue';
import { useMainStore } from '../stores/counter';
export default {
    components: {
        Table,
        Card,
        Cart,
        Footer
    },
    computed: {
        receipt() {
            return useMainStore()?.receipt;
        }
    }
}
</script>

<template>
    <div class="flex">
        <div
            style="display: flex; flex-direction: column; position: sticky; top: 0; margin-left: 40px; margin-right: -200px; margin-top: 30px; gap: 50px;">
            <Card />
            <Cart />
        </div>
        <div style="width: 65%; margin: auto; margin-top: 20px; height: 100vh; overflow: auto;">
            <Table />
        </div>
    </div>
    {{ JSON.parse(receipt) }}
    <Footer style="width: 65%; margin: 20%; margin-bottom: 60px;" />
</template>
