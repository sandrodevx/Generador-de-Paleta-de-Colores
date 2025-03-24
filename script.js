document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const paletteGrid = document.getElementById('palette');
    const generateBtn = document.getElementById('generate-btn');
    const saveBtn = document.getElementById('save-btn');
    const savedPalettesContainer = document.getElementById('saved-palettes');
    const emptyMessage = document.getElementById('empty-message');
    const currentYear = document.getElementById('current-year');
    
    // Actualizar el año en el footer
    currentYear.textContent = new Date().getFullYear();
    
    // Paleta actual
    let currentPalette = [];
    
    // Generar color hexadecimal aleatorio
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // Generar una paleta de 5 colores
    function generatePalette() {
        paletteGrid.innerHTML = '';
        currentPalette = [];
        
        for (let i = 0; i < 5; i++) {
            const color = getRandomColor();
            currentPalette.push(color);
            
            const colorCard = document.createElement('div');
            colorCard.className = 'color-card';
            colorCard.style.backgroundColor = color;
            colorCard.setAttribute('role', 'listitem');
            colorCard.setAttribute('aria-label', `Color ${i + 1}: ${color}`);
            
            const colorValue = document.createElement('span');
            colorValue.className = 'color-value';
            colorValue.textContent = color;
            
            colorCard.appendChild(colorValue);
            paletteGrid.appendChild(colorCard);
            
            // Copiar al portapapeles al hacer clic
            colorCard.addEventListener('click', function() {
                navigator.clipboard.writeText(color);
                
                // Feedback visual
                const originalText = colorValue.textContent;
                colorValue.textContent = '¡Copiado!';
                colorValue.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                
                setTimeout(() => {
                    colorValue.textContent = originalText;
                    colorValue.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                }, 1000);
            });
        }
    }
    
    // Guardar la paleta actual
    function savePalette() {
        if (currentPalette.length === 0) return;
        
        const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];
        savedPalettes.push(currentPalette);
        localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
        
        renderSavedPalettes();
    }
    
    // Mostrar paletas guardadas
    function renderSavedPalettes() {
        const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];
        
        if (savedPalettes.length === 0) {
            emptyMessage.style.display = 'block';
            savedPalettesContainer.innerHTML = '';
            return;
        }
        
        emptyMessage.style.display = 'none';
        savedPalettesContainer.innerHTML = '';
        
        savedPalettes.forEach((palette, index) => {
            const paletteElement = document.createElement('div');
            paletteElement.className = 'saved-palette';
            paletteElement.setAttribute('role', 'listitem');
            
            const colorsContainer = document.createElement('div');
            colorsContainer.className = 'saved-colors';
            
            palette.forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.className = 'saved-color';
                colorDiv.style.backgroundColor = color;
                colorDiv.setAttribute('aria-label', color);
                colorsContainer.appendChild(colorDiv);
            });
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-secondary';
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.style.marginTop = '0.5rem';
            deleteBtn.style.width = '100%';
            
            deleteBtn.addEventListener('click', function() {
                savedPalettes.splice(index, 1);
                localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
                renderSavedPalettes();
            });
            
            paletteElement.appendChild(colorsContainer);
            paletteElement.appendChild(deleteBtn);
            savedPalettesContainer.appendChild(paletteElement);
        });
    }
    
    // Event listeners
    generateBtn.addEventListener('click', generatePalette);
    saveBtn.addEventListener('click', savePalette);
    
    // Inicializar
    generatePalette();
    renderSavedPalettes();
});
