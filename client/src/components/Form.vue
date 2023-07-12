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
    <div class="main-container">
        <div class="form-container">
            <form @submit.prevent="submitForm(dataInput)" class="form" action="#">
                <h5 class="form-headline">{{ isRegister ? `Sign up to our platform` :
                    `Sign in to our platform` }}</h5>
                <div>
                    <label for="email" class="form-label">Your
                        email</label>
                    <input v-model="dataInput.email" type="email" name="email" id="email" class="input-email"
                        placeholder="name@company.com" required>
                </div>
                <div>
                    <label for="password" class="form-label">Your
                        password</label>
                    <input v-model="dataInput.password" type="password" name="password" id="password" placeholder="••••••••"
                        class="input-password" required>
                </div>
                <button type="submit" class="form-submit">{{
                    isRegister ? `Register as New member` : `Login
                    to your account` }}</button>
                <div @click="changeForm()" class="link-container">
                    {{ isRegister ? `Already have an account?` : `Not registered?` }} <a href="#">{{ isRegister ?
                        `Login Now` : `Create Account` }}</a>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}

.form-container {
    width: 100%;
    max-width: 20rem;
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

.input-email {
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

.input-password {
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
    width: 100%;
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
}

.form-submit:hover {
    background-color: #1e40af;
}

.form-submit:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
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
</style>