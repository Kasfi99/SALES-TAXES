<script>
import { useMainStore } from '../stores/counter';
import Modal from './Modal.vue';

export default {
    data() {
        return {
            dataInput: {
                name: null,
                quantity: null,
                price: null,
                origin: null,
                category: null,
            }
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
        toggleModal(modal) {
            useMainStore().toggleModal(modal);
        },
        confirmMyOrder(datataxes) {
            useMainStore().confirmMyOrder(datataxes)
        },
        submitForm(dataInput) {
            console.log(dataInput);
            this.toggleModal('Close');
            useMainStore().submitForm(dataInput)
        }
    },
};
</script>

<template>
    <div v-if="showModal === 'Form'">
        <div class="main-container">
            <div class="form-container">
                <form @submit.prevent="submitForm(dataInput)" class="form" action="#">
                    <h5 class="form-headline">{{ isRegister ? `Sign up to our platform` :
                        `Sign in to our platform` }}</h5>
                    <div>
                        <label for="name" class="form-label">Your
                            name</label>
                        <input v-model="dataInput.name" type="name" name="name" id="name" class="input-name"
                            placeholder="name@company.com" required>
                    </div>
                    <div>
                        <label for="quantity" class="form-label">Your
                            quantity</label>
                        <input v-model="dataInput.quantity" type="number" name="quantity" id="quantity" placeholder="10"
                            class="input-numerical" required>
                    </div>
                    <div>
                        <label for="price" class="form-label">Your price</label>
                        <input v-model="dataInput.price" type="number" step="any" name="price" id="price"
                            placeholder="$10.80" class="input-numerical" required>
                    </div>
                    <div>

                        <label for="origin" class="form-label">Select
                            an option</label>
                        <select v-model="dataInput.origin" id="origin" class="select-origin">
                            <option disabled selected>Choose Product Origin</option>
                            <option value="domestic">Domestic</option>
                            <option value="imported">Imported</option>
                        </select>
                    </div>
                    <div>
                        <label for="category" class="form-label">Select
                            an option</label>
                        <select v-model="dataInput.category" id="category" class="select-origin">
                            <option disabled selected>Choose Product Category</option>
                            <option value="Books">Books</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Food">Food</option>
                            <option value="Personal care">Personal Care</option>
                            <option value="Medical products">Medical Product</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" class="form-submit">Add New Product</button>
                        <button @click="toggleModal('Close')" class="form-cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-container {
    position: fixed;
    z-index: 50;
    width: 100%;
    padding: 4px;
    overflow-x: hidden;
    overflow-y: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-height: calc(100% - 1rem);
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container {
    position: relative;
    width: 780px;
    padding: 1rem;
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

@media (min-width: 640px) {
    .form-container {
        padding: 1.5rem;
    }
}

@media (min-width: 768px) {
    .form-container {
        padding: 2rem;
    }
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-headline {
    font-size: 1.25rem;
    font-weight: 500;
    color: #333333;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #333333;
}

.input-name {
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    color: #4b5563;
    font-size: 0.875rem;
    border-radius: 0.375rem;
    outline-color: #3b82f6;
    outline-width: 2px;
    display: block;
    width: 100%;
    padding: 0.625rem;
}

.input-numerical {
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    color: #4b5563;
    font-size: 0.875rem;
    border-radius: 0.375rem;
    outline-color: #3b82f6;
    outline-width: 2px;
    display: block;
    width: 100%;
    padding: 0.625rem;
}

.form-submit {
    width: 160px;
    color: #ffffff;
    background-color: #1d4ed8;
    transition: background-color 0.3s ease;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    text-align: center;
    outline: none;
    border: none;
    margin-left: 20px;
    position: absolute;
    right: 30%;
    top: 10%;
}

.form-submit:hover {
    background-color: #1e40af;
}

.form-submit:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

.form-cancel {
    width: 160px;
    color: #ffffff;
    background-color: #ef2c2c;
    transition: background-color 0.3s ease;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    text-align: center;
    outline: none;
    border: none;
    margin-left: 20px;
    position: absolute;
    right: 5%;
    top: 10%;
}

.form-cancel:hover {
    background-color: #932121;
}

.form-cancel:focus {
    box-shadow: 0 0 0 3px rgba(241, 31, 31, 0.5);
}

.link-container {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
}

a {
    color: #3b82f6;
}

a:hover {
    text-decoration: underline;
}

.select-origin {
    background-color: #F9FAFB;
    border: 1px solid #D1D5DB;
    color: #374151;
    font-size: 14px;
    border-radius: 0.375rem;
    outline: none;
    padding: 0.625rem;
    width: 100%;
}

.select-origin:focus {
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.select-origin.dark::placeholder {
    color: #9CA3AF;
}
</style>