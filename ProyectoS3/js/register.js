document.addEventListener('DOMContentLoaded', function() {
    const formRegister = document.querySelector('.needs-validation');

    formRegister.addEventListener('submit', function(event) {
        event.preventDefault(); 
        event.stopPropagation(); 

        const email = document.querySelector('#email').value;
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const race = document.querySelector('#race').value;

        // Verificar si el formulario es válido
        const isValid = formRegister.checkValidity();
        formRegister.classList.add('was-validated');

        // Validar campos obligatorios
        if (!isValid) {
            alert('Todos los campos son obligatorios y deben ser válidos.');
            return;
        }

        // Validar formato del email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Validar username: solo letras y máximo 16 caracteres
        const usernamePattern = /^[A-Za-z]{1,16}$/;
        if (!usernamePattern.test(username)) {
            alert('El nombre de usuario debe contener solo letras y tener un máximo de 16 caracteres.');
            return;
        }

        // Validar contraseña: puede contener números y letras, máximo 16 caracteres
        if (password.length > 16) {
            alert('La contraseña debe tener un máximo de 16 caracteres.');
            return;
        }

        // Verificar si el usuario ya existe en el almacenamiento local
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioExistente = usuarios.find(user => user.email === email || user.username === username);
        if (usuarioExistente) {
            alert('El usuario ya existe. Prueba con otro correo o nombre de usuario.');
            return;
        }

        console.log('Formulario de registro enviado:', { email, username, password, race });

        // Si todas las validaciones son exitosas
        const registroExitoso = true; 

        if (registroExitoso) {
            // Guardar el nuevo usuario en el almacenamiento local
            const nuevoUsuario = { email, username, password, race };
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Alerta de registro exitoso
            alert('Usuario registrado con éxito.');

            console.log('Registro exitoso:', { email, username });
            formRegister.reset(); 
            formRegister.classList.remove('was-validated'); 
        } else {
            console.log('El usuario ya existe o hubo un error en el registro.');
        }
    }, false);
});
