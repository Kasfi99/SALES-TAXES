<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/counter';
export default {
    data() {
        return {
            isRegister: false,
            dataInput: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        ...mapActions(useMainStore, ['signIn', 'signUp']),
        changeForm() {
            this.isRegister = !this.isRegister
        },
        submitForm(dataInput) {
            if (this.isRegister) {
                this.signUp(dataInput)
            } else {
                this.signIn(dataInput)
            }

            this.isRegister = false;
            this.dataInput.email = null;
            this.dataInput.password = null;
        }
    }
}
</script>

<template>
    <div class="flex items-center justify-center mt-10">
        <div
            class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form @submit.prevent="submitForm(dataInput)" class="space-y-6" action="#">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white">{{ isRegister ? `Sign up to our platform` :
                    `Sign in to our platform` }}</h5>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        email</label>
                    <input v-model="dataInput.email" type="email" name="email" id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com" required>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        password</label>
                    <input v-model="dataInput.password" type="password" name="password" id="password" placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required>
                </div>
                <button type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{
                        isRegister ? `Register as New member` : `Login
                    to your account` }}</button>
                <div @click="changeForm()" class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    {{ isRegister ? `Already have an account?` : `Not registered?` }} <a href="#"
                        class="text-blue-700 hover:underline dark:text-blue-500">{{ isRegister ?
                            `Login Now` : `Create Account` }}</a>
                </div>
            </form>
        </div>
    </div>
</template>