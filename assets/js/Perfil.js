// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del Dominio
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const infoItems = document.querySelectorAll('.info-item');
    
    // Variable para almacenar los valores originales
    let originalValues = {};
    
    // Función para habilitar la edición
    function enableEditing() {
        // Guardar valores originales
        infoItems.forEach(function(item) {
            const key = item.querySelector('strong').textContent.replace(':', '').trim();
            const valueElement = item.childNodes[2];
            originalValues[key] = valueElement.textContent.trim();
            
            // Crear campo de entrada
            const input = document.createElement('input');
            input.type = 'text';
            input.value = valueElement.textContent.trim();
            input.className = 'form-control edit-input';
            input.dataset.field = key;
            
            // Reemplazar texto con campo de entrada
            item.replaceChild(input, valueElement);
        });
        
        // Cambiar estado de botones
        editBtn.disabled = true;
        saveBtn.disabled = false;
        cancelBtn.disabled = false;
        
    }
    
    // Función para guardar cambios
    function saveChanges() {
        let hasChanges = false;
        const changes = {};
        
        // Recoger valores editados
        document.querySelectorAll('.edit-input').forEach(function(input) {
            const field = input.dataset.field;
            const newValue = input.value.trim();
            const originalValue = originalValues[field];
            
            if (newValue !== originalValue) {
                hasChanges = true;
                changes[field] = newValue;
            }
            
            // Reemplazar input con texto
            const textNode = document.createTextNode(newValue);
            input.parentNode.replaceChild(textNode, input);
        });
        
        // Si hay cambios, mostrarlos (aquí normalmente enviarías a un servidor)
        if (hasChanges) {
            // En una aplicación real, aquí enviarías los cambios al servidor
            alert('Cambios guardados con éxito:\n' + JSON.stringify(changes, null, 2));
            
            // Actualizar valores originales
            Object.keys(changes).forEach(function(key) {
                originalValues[key] = changes[key];
            });
        } else {
            alert('No se realizaron cambios.');
        }
        
        // Restaurar estado de botones
        editBtn.disabled = false;
        saveBtn.disabled = true;
        cancelBtn.disabled = true;
    }
    
    // Función para cancelar edición
    function cancelEditing() {
        // Restaurar valores originales
        document.querySelectorAll('.edit-input').forEach(function(input) {
            const field = input.dataset.field;
            const textNode = document.createTextNode(originalValues[field]);
            input.parentNode.replaceChild(textNode, input);
        });
        
        // Restaurar estado de botones
        editBtn.disabled = false;
        saveBtn.disabled = true;
        cancelBtn.disabled = true;
    }
    
    // Asignar event listeners a los botones
    editBtn.addEventListener('click', enableEditing);
    saveBtn.addEventListener('click', saveChanges);
    cancelBtn.addEventListener('click', cancelEditing);
});