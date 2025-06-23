document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updateJugadaForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el envío por defecto del formulario (recarga de página)

        const jugadaId = document.getElementById('jugadaId').value;
        const numerosInputs = document.querySelectorAll('input[name="numeros[]"]');
        
        const numeros = Array.from(numerosInputs).map(input => parseInt(input.value, 10));

        // Validación básica: Asegúrate de que todos los números sean válidos y que haya 20
        if (numeros.length !== 20 || numeros.some(isNaN)) {
            alert('Por favor, ingresa 20 números válidos.');
            return;
        }

        const data = {
            id: jugadaId,
            numeros: numeros
        };

        console.log('Datos a enviar:', data);

        try {
            // Reemplaza '/api/update-jugada' con la URL de tu endpoint de backend
            const response = await fetch('/api/update-jugada', {
                method: 'PUT', // O POST, dependiendo de cómo configures tu backend para las actualizaciones
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Jugada actualizada con éxito: ' + JSON.stringify(result));
                // Aquí podrías redirigir al usuario o actualizar la UI
            } else {
                const errorData = await response.json();
                alert('Error al actualizar la jugada: ' + (errorData.message || response.statusText));
            }
        } catch (error) {
            console.error('Error de red o del servidor:', error);
            alert('Ocurrió un error al intentar conectar con el servidor.');
        }
    });

    // Opcional: Función para cargar los datos existentes en el formulario
    async function loadJugadaData(id) {
        try {
            const response = await fetch(`/api/jugada/${id}`); // Endpoint para obtener datos
            if (response.ok) {
                const jugada = await response.json();
                document.getElementById('jugadaId').value = jugada._id;
                jugada.numeros.forEach((num, index) => {
                    const input = document.getElementById(`numero${index + 1}`);
                    if (input) {
                        input.value = num;
                    }
                });
            } else {
                console.error('No se pudo cargar la jugada con ID:', id);
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    // Llama a loadJugadaData() cuando sea apropiado, por ejemplo:
    // loadJugadaData('ALGUN_ID_EXISTENTE'); 
});