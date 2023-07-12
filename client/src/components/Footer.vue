<template>
    <footer class="footer">
        <div class="footer-container">
            <span class="span">© 2023 <a href="/" class="">HomeDevice™</a>. All Rights Reserved.
            </span>
            <ul class="footer-list">
                <li>
                    <a href="#" class="list-point">About</a>
                </li>
                <li>
                    <a href="#" class="list-point">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="list-point">Licensing</a>
                </li>
                <li>
                    <a href="#" class="list-point">Contact</a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
    margin: 1rem;
    width: 100%;
}

.footer-container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

@media (min-width: 768px) {
    .footer-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

span {
    font-size: 0.875rem;
    color: #6B7280;
    text-align: center;
}

@media (min-width: 640px) {
    span {
        font-size: 0.875rem;
        color: #6B7280;
        text-align: center;
    }
}

a {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.footer-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 3px;
    font-size: 14px;
    font-weight: 500;
    color: #6B7280;
}

@media (prefers-color-scheme: dark) {
    .footer-list {
        color: #9CA3AF;
    }
}

.list-point {
    margin-right: 1rem;
}

.list-point:hover {
    text-decoration: underline;
}

@media (min-width: 768px) {
    .list-point {
        margin-right: 1.5rem;
    }
}
</style>