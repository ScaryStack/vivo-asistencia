//carga el documento y espera a que esté listo
document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('edit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const infoItems = document.querySelectorAll('.info-item');
    
    let originalValues = {};
    let isEditing = false;

    //habilita la edición de los campos
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

    //guarda los cambios realizados en los campos
    function saveChanges() {
        let hasChanges = false;
        const changes = {};

        //validación antes de guardar
        let invalidEmail = false;

        document.querySelectorAll('.edit-input').forEach(function(input) {
            const field = input.dataset.field;
            const newValue = input.value.trim();
            const originalValue = originalValues[field];

            if (field === 'Correo personal' && !newValue.endsWith('@gmail.com')) {
                alert('El correo personal debe ser de dominio @gmail.com');
                invalidEmail = true;
                return; //sale del bucle
            }

            if (newValue !== originalValue) {
                hasChanges = true;
                changes[field] = newValue;
            }

            const textNode = document.createTextNode(newValue);
            input.parentNode.replaceChild(textNode, input);
        });

        if (invalidEmail) {
            cancelEditing(); //revierte cambios si correo es invalido
            return;
        }

        //si hay cambios, los muestra en una alerta
        if (hasChanges) {
            alert('Cambios guardados con éxito:\n' + JSON.stringify(changes, null, 2));
            Object.keys(changes).forEach(function(key) {
                originalValues[key] = changes[key];
            });
        } else {
            alert('No se realizaron cambios.');
        }//restablece el botón y deshabilita la edición

        editBtn.textContent = 'Actualizar datos';
        editBtn.classList.remove('btn-success');
        editBtn.classList.add('btn-edit');
        cancelBtn.disabled = true;
        isEditing = false;
    }

    //cancela la edición y restaura los valores originales
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

    //event listeners para los botones
    editBtn.addEventListener('click', function() {
        if (!isEditing) {
            enableEditing();
        } else {
            saveChanges();
        }
    });

    cancelBtn.addEventListener('click', cancelEditing);
});
