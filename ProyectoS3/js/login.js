document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.querySelector('.needs-validation');

    // Asegurarse de que el formulario se haya encontrado
    if (!formLogin) {
        console.error('Formulario no encontrado.');
        return;
    }

    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        const isValid = formLogin.checkValidity();
        formLogin.classList.add('was-validated');

        if (!isValid) {
            return;
        }

        // Llama a la función iniciarSesion de db.js
        iniciarSesion(username, password);
    }, false);
});
