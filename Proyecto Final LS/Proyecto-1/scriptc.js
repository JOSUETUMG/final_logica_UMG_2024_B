// Función para actualizar las opciones de la unidad de destino basadas en la unidad de origen seleccionada
function actualizarUnidadesDestino() {
    // Obtener el valor de la unidad de origen seleccionada
    const unidadOrigen = document.getElementById('unidadOrigen').value;
    // Obtener el elemento de la unidad de destino
    const unidadDestino = document.getElementById('unidadDestino');
    // Lista de opciones de unidades disponibles
    const opciones = ['milimetros', 'centimetros', 'metros', 'kilometros', 'pulgadas', 'pies', 'yardas', 'millas', 'varas'];

    // Limpiar las opciones existentes en la unidad de destino
    unidadDestino.innerHTML = '';

    // Iterar sobre cada opción y agregarla como una nueva opción si no es igual a la unidad de origen
    opciones.forEach(opcion => {
        if (opcion !== unidadOrigen) {
            const nuevaOpcion = document.createElement('option');
            nuevaOpcion.value = opcion;
            // Convertir la primera letra de la opción en mayúscula para mejorar la presentación
            nuevaOpcion.textContent = opcion.charAt(0).toUpperCase() + opcion.slice(1);
            unidadDestino.appendChild(nuevaOpcion);
        }
    });
}

// Función para realizar la conversión de unidades
function convertir() {
    // Obtener el valor ingresado por el usuario y convertirlo a un número de punto flotante
    const valor = parseFloat(document.getElementById('valor').value);
    // Obtener las unidades de origen y destino seleccionadas por el usuario
    const unidadOrigen = document.getElementById('unidadOrigen').value;
    const unidadDestino = document.getElementById('unidadDestino').value;
    let resultado;

    // Convertir todas las unidades a metros para facilitar las conversiones
    let valorEnMetros;
    switch (unidadOrigen) {
        case 'milimetros':
            valorEnMetros = valor / 1000;
            break;
        case 'centimetros':
            valorEnMetros = valor / 100;
            break;
        case 'metros':
            valorEnMetros = valor;
            break;
        case 'kilometros':
            valorEnMetros = valor * 1000;
            break;
        case 'pulgadas':
            valorEnMetros = valor * 0.0254;
            break;
        case 'pies':
            valorEnMetros = valor * 0.3048;
            break;
        case 'yardas':
            valorEnMetros = valor * 0.9144;
            break;
        case 'millas':
            valorEnMetros = valor * 1609.34;
            break;
        case 'varas':
            valorEnMetros = valor * 0.835905;
            break;
        default:
            valorEnMetros = null;
            break;
    }

    // Convertir de metros a la unidad de destino seleccionada
    switch (unidadDestino) {
        case 'milimetros':
            resultado = valorEnMetros * 1000;
            break;
        case 'centimetros':
            resultado = valorEnMetros * 100;
            break;
        case 'metros':
            resultado = valorEnMetros;
            break;
        case 'kilometros':
            resultado = valorEnMetros / 1000;
            break;
        case 'pulgadas':
            resultado = valorEnMetros / 0.0254;
            break;
        case 'pies':
            resultado = valorEnMetros / 0.3048;
            break;
        case 'yardas':
            resultado = valorEnMetros / 0.9144;
            break;
        case 'millas':
            resultado = valorEnMetros / 1609.34;
            break;
        case 'varas':
            resultado = valorEnMetros / 0.835905;
            break;
        default:
            resultado = 'Conversión no soportada';
            break;
    }

    // Mostrar el resultado de la conversión en el elemento de resultado
    document.getElementById('resultado').textContent = `Resultado: ${resultado}`;
}

