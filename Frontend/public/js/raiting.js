document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    const stars = document.querySelectorAll('.star'); // Corregido: `stars` en lugar de `starts`
    const rating = document.querySelector('#ratingValue');
    const probada = document.getElementById('probadaCheck');
    const ratingSection = document.getElementById('ratingSection');

    // Mostrar/ocultar la sección de calificación según el checkbox
    probada.addEventListener('change', function () {
        if (this.checked) {
            ratingSection.classList.remove('d-none');
        } else {
            ratingSection.classList.add('d-none');
            rating.value = ''; // Reinicia el valor de la calificación si se desmarca
            stars.forEach(star => {
                star.classList.remove('bi-star-fill', 'text-warning');
                star.classList.add('bi-star');
            });
        }
    });

    // Manejar el clic en las estrellas
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            rating.value = value;

            // Rellenar las estrellas hasta la seleccionada
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= value) {
                    s.classList.remove('bi-star');
                    s.classList.add('bi-star-fill', 'text-warning');
                } else {
                    s.classList.remove('bi-star-fill', 'text-warning');
                    s.classList.add('bi-star');
                }
            });
        });
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (!rating.value && probada.checked) {
            alert('Por favor selecciona una calificación');
            return;
        }

        try {
            const formData = new FormData(form);
            const ratingValue = rating.value;
            const probadaValue = probada.checked;
            const hamburguesaId = formData.get('id_hamburguesa');

            const response = await fetch('/calificaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hamburguesa_id: hamburguesaId,
                    puntuacion: ratingValue,
                    probada: probadaValue
                })
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (response.ok) {
                alert('Calificación guardada exitosamente');
                window.location.href = '/hamburguesa/' + hamburguesaId;
            } else {
                alert('Error al guardar la calificación');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar la calificación');
        }
    });
});