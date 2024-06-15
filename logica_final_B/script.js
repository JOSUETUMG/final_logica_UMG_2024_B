function realizarOperacion() {
    const num1 = parseFloat(document.getElementById('input1').value);
    const num2 = parseFloat(document.getElementById('input2').value);
    const num3 = parseFloat(document.getElementById('input3').value);

    let operacion = '';
    let resultado = 0;

    if (num1 < num3) {
        operacion = 'Suma';
        resultado = num1 + num2 + num3;
    } else if (num2 === 0) {
        operacion = 'Resta';
        resultado = Math.max(num1, num3) - Math.min(num1, num3);
    } else if (num1 === num2 && num2 === num3) {
        operacion = 'Multiplicación';
        resultado = num1 * num2 * num3;
    }

    document.getElementById('resultado').textContent = `Operación: ${operacion}, Resultado: ${resultado}`;
}

function repetirOperacion() {
    const sumaTotal = parseFloat(document.getElementById('input1').value) + parseFloat(document.getElementById
        ('input2').value) + parseFloat(document.getElementById('input3').value);

    if (sumaTotal > 10) {
        for (let i = 0; i < sumaTotal; i++) {
            const multiplicacion = parseFloat(document.getElementById('input1').value) * parseFloat
            (document.getElementById('input2').value) - parseFloat(document.getElementById('input3').value);
            console.log(`Resultado ${i + 1}: ${multiplicacion}`);
        }
    } else {
        for (let i = 0; i < sumaTotal; i++) {
            const suma = parseFloat(document.getElementById('input1').value) + parseFloat(document.getElementById(
                'input2').value) + parseFloat(document.getElementById('input3').value);
            console.log(`Resultado ${i + 1}: ${suma}`);
        }
    }
}