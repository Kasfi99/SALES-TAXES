<script>
import { RouterLink } from 'vue-router';
import { useMainStore } from '../stores/counter';

export default {
    data() {
        return {
            openNavbar: false,
        }
    },
    computed: {
        isLogged() {
            return useMainStore().isLogged;
        },
        updateModal() {
            return useMainStore().showModal;
        }
    },
    methods: {
        logOut() {
            return useMainStore().LogOut();
        },
        showModal() {
            useMainStore().toggleModal();
        }
    }
}
</script>

<template>
    <nav>
        <div class="nav-container">
            <router-link to="/" href="#" class="logos">
                <div class="logo-container">
                    <img src="../assets/2.png" alt="Company Logo" class="logo" />
                </div>
                <span class="logo-caption">Home Device</span>
            </router-link>
            <div
                :class="{ 'hidden': !openNavbar, 'block': openNavbar, 'w-full': true, 'md:block': true, 'md:w-auto': true }">
                <ul class="list-container">
                    <li v-if="!isLogged">
                        <router-link to="/sign-in">
                            <button type="button" class="my-button my-button-secondary">
                                Be a Member
                            </button>
                        </router-link>
                    </li>
                    <li v-if="isLogged">
                        <button @click="logOut()" type="button" class="my-button my-button-logout">
                            Log Out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    background-color: white;
    border-color: gray;
    position: sticky;
    top: 0;
    z-index: 50;
    margin-left: 430px;
    max-width: 1280px;
}


.nav-container {
    height: 120px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}

.logo-container {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 0.75rem;
    display: flex;
    overflow: hidden;
    border-radius: 50%;
}

.logo {
    transform: scale(1.5);
    object-fit: cover;
}

.logo-caption {
    align-self: center;
    font-size: 2rem;
    font-weight: 600;
    white-space: nowrap;
    color: #000000;
}

.logos {
    display: flex;
    align-items: center;
}

.list-container {
    font-weight: 500;
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 1rem;
    margin-top: 1rem;
    width: 330px;
}


.my-button {
    width: 150px;
    height: 50px;
    background-color: red;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.25rem;
    text-align: center;
    cursor: pointer;
    outline: none;

}

.my-button-secondary {
    background-image: linear-gradient(135deg, #8b5cf6, #1d4ed8);
    color: #ffffff;
}

.my-button-secondary:hover {
    background-image: linear-gradient(135deg, #7c3aed, #1d4ed8);
}

.my-button-secondary:focus {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
    outline-color: #93c5fd;
}

.my-button-logout {
    background-color: #dc2626;
    color: #ffffff;
}

.my-button-logout:hover {
    background-color: #c53030;
}

.my-button-logout:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
    outline-color: #f87171;
}
</style>