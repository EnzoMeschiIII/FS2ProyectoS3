document.addEventListener('DOMContentLoaded', function() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioActual = null; // Variable para almacenar el usuario actual
    
    const usuarioActualFromStorage = JSON.parse(localStorage.getItem('usuarioActual'));
    if (usuarioActualFromStorage) {
            usuarioActual = usuarioActualFromStorage; // Restaurar el usuario actual
        }

    function crearUsuarioAdmin() {
        const adminUsuario = {
            email: 'admin@admin.com',
            username: 'admin',
            password: 'admin123',
            race: 'Zerg'
        };

        const usuarioExistente = usuarios.find(user => user.username === adminUsuario.username);
        if (!usuarioExistente) {
            usuarios.push(adminUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            console.log('Usuario admin creado:', adminUsuario);
        } else {
            console.log('El usuario admin ya existe en localStorage.');
        }
    }

    crearUsuarioAdmin();

    function registrarUsuario(email, username, password, race) {
        console.log('Intentando registrar usuario:', { email, username, race });
        const usuarioExistente = usuarios.find(user => user.email === email || user.username === username);
        if (usuarioExistente) {
            mostrarAlerta('El usuario ya existe.', 'danger');
            console.log('El usuario ya existe.');
            return false;
        }

        const nuevoUsuario = { email, username, password, race };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrarAlerta('Usuario registrado exitosamente.', 'success');
        console.log('Usuario registrado exitosamente:', nuevoUsuario);
        return true;
    }

    function iniciarSesion(emailOrUsername, password) {
        console.log('Intentando iniciar sesión:', { emailOrUsername, password });

        // Verificar usuario admin directamente
        if (emailOrUsername === 'admin' && password === 'admin123') {
            mostrarAlerta('Inicio de sesión exitoso como admin.', 'success');
            console.log('Inicio de sesión exitoso con admin');
            usuarioActual = { email: 'admin@admin.com', username: 'admin', password: 'admin123', race: 'Zerg' }; // Guardar usuario admin
            window.location.href = 'homeAdmin.html'; // Redirigir a homeAdmin.html
            return true;
        }

        // Buscar usuario normal
        const usuario = usuarios.find(user => 
            (user.email === emailOrUsername || user.username === emailOrUsername) && user.password === password);
        
        if (usuario) {
            mostrarAlerta('Inicio de sesión exitoso.', 'success');
            console.log('Inicio de sesión exitoso:', usuario);
            usuarioActual = usuario; // Almacenar el usuario que ha iniciado sesión
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual)); // Almacenar en localStorage
            window.location.href = 'home.html'; // Redirige a la página de inicio normal
            return true;
        } else {
            mostrarAlerta('Email/Usuario o contraseña incorrectos.', 'danger');
            console.log('Email/Usuario o contraseña incorrectos.');
            return false;
        }
    }

    function obtenerDatosUsuario() {
        return usuarioActual; // Retorna el usuario actual
    }

    function mostrarAlerta(mensaje, tipo) {
        const alertaDiv = document.createElement('div');
        alertaDiv.className = `alert alert-${tipo}`;
        alertaDiv.appendChild(document.createTextNode(mensaje));
        const container = document.querySelector('.container');
        const firstChild = container.firstChild;
        
        if (firstChild) {
            container.insertBefore(alertaDiv, firstChild);
        } else {
            container.appendChild(alertaDiv);
        }

        setTimeout(() => {
            const alerta = document.querySelector('.alert');
            if (alerta) {
                alerta.remove();
            }
        }, 6000);
    }

    // Funciones para editar perfil
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveChangesBtn');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            if (usuarioActual) {
                document.getElementById('modalEmail').value = usuarioActual.email;
                document.getElementById('modalUsername').value = usuarioActual.username;
                document.getElementById('modalPassword').value = usuarioActual.password;
                document.getElementById('modalRace').value = usuarioActual.race;
            }
    
            const editProfileModalElement = document.getElementById('editProfileModal');
            if (editProfileModalElement) {
                const editProfileModal = new bootstrap.Modal(editProfileModalElement);
                editProfileModal.show();
            } else {
                console.error('El modal no se encontró en el DOM.');
            }
        });
    }

// Escucha el evento del botón Save
if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', function() {
        // Obtener los valores ingresados en el modal
        const nuevoEmail = document.getElementById('modalEmail').value;
        const nuevoUsername = document.getElementById('modalUsername').value;
        const nuevoPassword = document.getElementById('modalPassword').value;
        const nuevaRace = document.getElementById('modalRace').value;

        // Validar si el usuario ingresado y contraseña coinciden con el usuario actual
        const usuarioExistente = usuarios.find(user => user.email === usuarioActual.email && user.password === usuarioActual.password);

        if (usuarioExistente) {
            // Actualizar los datos del usuario existente
            usuarioExistente.email = nuevoEmail;
            usuarioExistente.username = nuevoUsername;
            usuarioExistente.password = nuevoPassword;
            usuarioExistente.race = nuevaRace;

            // Actualizar usuario actual y guardar cambios en localStorage
            usuarioActual = usuarioExistente;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

            alert('Perfil actualizado exitosamente.');

            // Cerrar el modal después de guardar
            const editProfileModal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
            if (editProfileModal) {
                editProfileModal.hide();
            }
        } else {
            alert('Error: No se encontró el usuario para actualizar.');
        }
    });
}


    // Función de recuperación de contraseña
    function recuperarContrasena(email) {
    console.log('Intentando recuperar contraseña para:', email);

    // Buscar usuario por email en el array de usuarios
    const usuario = usuarios.find(user => user.email === email);

        if (usuario) {
        console.log('Usuario encontrado:', usuario);
        document.getElementById("recoveredPassword").value = usuario.password; // Mostrar contraseña en el campo
        } else {
        console.log('No se encontró ningún usuario con ese email.');
        mostrarAlerta('No se encontró ningún usuario con ese email.', 'danger');
        }
    }



    // Exportar funciones
    window.registrarUsuario = registrarUsuario;
    window.iniciarSesion = iniciarSesion;
    window.recuperarContrasena = recuperarContrasena;
});
