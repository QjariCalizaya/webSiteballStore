

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".buy-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".product-card");
            const name = card.dataset.name;
            const price = card.dataset.price;
            const img = card.dataset.img;

            // Redirigir con parámetros en la URL
            const params = new URLSearchParams({
                name,
                price,
                img
            });
            window.location.href = `pasarella.html?${params.toString()}`;
        });
    });
});


document.getElementById('buy-button').addEventListener('click', function() {
    dataLayer.push({
        event: 'click_buy_button'
    });
    
});
