// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('edit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const infoItems = document.querySelectorAll('.info-item');
    
    let originalValues = {};
    let isEditing = false;

    function enableEditing() {
        infoItems.forEach(function(item) {
            const key = item.querySelector('strong').textContent.replace(':', '').trim();
            const valueElement = item.childNodes[2];
            originalValues[key] = valueElement.textContent.trim();
            
            const input = document.createElement('input');
            input.type = 'text';
            input.value = valueElement.textContent.trim();
            input.className = 'form-control edit-input';
            input.dataset.field = key;
            
            item.replaceChild(input, valueElement);
        });
        
        editBtn.textContent = 'Guardar cambios';
        editBtn.classList.remove('btn-edit');
        editBtn.classList.add('btn-success');
        cancelBtn.disabled = false;
        isEditing = true;
    }

    function saveChanges() {
        let hasChanges = false;
        const changes = {};

        // ✅ Validación antes de guardar
        let invalidEmail = false;

        document.querySelectorAll('.edit-input').forEach(function(input) {
            const field = input.dataset.field;
            const newValue = input.value.trim();
            const originalValue = originalValues[field];

            if (field === 'Correo personal' && !newValue.endsWith('@gmail.com')) {
                alert('El correo personal debe ser de dominio @gmail.com');
                invalidEmail = true;
                return; // sale del bucle
            }

            if (newValue !== originalValue) {
                hasChanges = true;
                changes[field] = newValue;
            }

            const textNode = document.createTextNode(newValue);
            input.parentNode.replaceChild(textNode, input);
        });

        if (invalidEmail) {
            cancelEditing(); // revierte cambios si correo inválido
            return;
        }

        if (hasChanges) {
            alert('Cambios guardados con éxito:\n' + JSON.stringify(changes, null, 2));
            Object.keys(changes).forEach(function(key) {
                originalValues[key] = changes[key];
            });
        } else {
            alert('No se realizaron cambios.');
        }

        editBtn.textContent = 'Actualizar datos';
        editBtn.classList.remove('btn-success');
        editBtn.classList.add('btn-edit');
        cancelBtn.disabled = true;
        isEditing = false;
    }

    function cancelEditing() {
        document.querySelectorAll('.edit-input').forEach(function(input) {
            const field = input.dataset.field;
            const textNode = document.createTextNode(originalValues[field]);
            input.parentNode.replaceChild(textNode, input);
        });

        editBtn.textContent = 'Actualizar datos';
        editBtn.classList.remove('btn-success');
        editBtn.classList.add('btn-edit');
        cancelBtn.disabled = true;
        isEditing = false;
    }

    editBtn.addEventListener('click', function() {
        if (!isEditing) {
            enableEditing();
        } else {
            saveChanges();
        }
    });

    cancelBtn.addEventListener('click', cancelEditing);
});
