document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form')
    const starts = document.querySelectorAll('.star')
    const rating = document.querySelector('#ratingValue')
    const probada = document.getElementById('probadaCheck')


    starts.forEach((star, index) => {
        star.addEventListener('click', function () {
            const valor = this.getAttribute('data-value')
            rating.value = valor

        })
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault()

        if (!rating.value) {
            alert('Por favor selecciona una calificacion')
            return
        }

        try {
            const formData = new FormData(form)
            const ratingValue = rating.value
            const probadaValue = probada.checked;
            const hamburguesaId = formData.get('id_hamburguesa')


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
            })
            const data = await response.json()
            console.log('Respuesta del servidor:', data)
            if (response.ok) {
                alert('Calificación guardada exitosamente')
                window.location.href = '/hamburguesa/' + hamburguesaId
            } else {
                alert('Error al guardar la calificación')
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar la calificación')
        }

    });

});
