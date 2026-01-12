const form = document.getElementById('registroForm');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const edad = document.getElementById('edad');
const submitBtn = document.getElementById('submitBtn');
const mensajeRegistro = document.getElementById('mensajeRegistro');

// Validaciones
function validarNombre() {
    if (nombre.value.trim().length < 3) {
        mostrarError(nombre, 'nombreError', 'El nombre debe tener al menos 3 caracteres');
        return false;
    }
    mostrarExito(nombre, 'nombreError');
    return true;
}

function validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value.trim())) {
        mostrarError(email, 'emailError', 'Correo electrónico inválido');
        return false;
    }
    mostrarExito(email, 'emailError');
    return true;
}

function validarPassword() {
    const regex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!regex.test(password.value)) {
        mostrarError(password, 'passwordError', 'Debe tener mínimo 8 caracteres, al menos 1 número y 1 símbolo');
        return false;
    }
    mostrarExito(password, 'passwordError');
    return true;
}

function validarConfirmPassword() {
    if (confirmPassword.value !== password.value || confirmPassword.value === '') {
        mostrarError(confirmPassword, 'confirmPasswordError', 'Las contraseñas no coinciden');
        return false;
    }
    mostrarExito(confirmPassword, 'confirmPasswordError');
    return true;
}

function validarEdad() {
    if (parseInt(edad.value) < 18 || edad.value === '') {
        mostrarError(edad, 'edadError', 'Debes ser mayor de 18 años');
        return false;
    }
    mostrarExito(edad, 'edadError');
    return true;
}

function mostrarError(input, idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
    input.classList.add('invalid');
    input.classList.remove('valid');
}

function mostrarExito(input, idError) {
    document.getElementById(idError).textContent = '';
    input.classList.add('valid');
    input.classList.remove('invalid');
}

// Validar todo
function validarFormulario() {
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const passwordValido = validarPassword();
    const confirmPasswordValido = validarConfirmPassword();
    const edadValida = validarEdad();

    submitBtn.disabled = !(nombreValido && emailValido && passwordValido && confirmPasswordValido && edadValida);
}

[nombre, email, password, confirmPassword, edad].forEach(input => {
    input.addEventListener('input', validarFormulario);
});

// Enviar formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mostrar solo el mensaje que quieres
    mensajeRegistro.textContent = "¡Sus datos fueron registrados correctamente!";
    mensajeRegistro.style.display = "block";

    form.reset();
    submitBtn.disabled = true;

    [nombre, email, password, confirmPassword, edad].forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
});
