function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la página');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('main-content').innerHTML = html;

            // Establecer la fecha máxima al día actual
            const today = new Date().toISOString().split('T')[0];
            const fechaInput = document.getElementById('fecha');
            if (fechaInput) {
                fechaInput.setAttribute('max', today);
            }

            // Resaltar la pestaña activa
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.classList.remove('active');
            });
            const currentTab = Array.from(tabs).find(tab => tab.onclick.toString().includes(page));
            if (currentTab) {
                currentTab.classList.add('active');
            }
        })
        .catch(error => {
            document.getElementById('main-content').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}