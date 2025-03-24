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
    
    // Generar color hexadecimal aleatorio (versión mejorada)
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
                navigator.clipboard.writeText(color).then(() => {
                    // Feedback visual
                    const originalText = colorValue.textContent;
                    colorValue.textContent = '¡Copiado!';
                    colorValue.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                    
                    setTimeout(() => {
                        colorValue.textContent = originalText;
                        colorValue.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    }, 1000);
                }).catch(err => {
                    console.error('Error al copiar: ', err);
                    // Fallback para navegadores que no soportan clipboard API
                    colorValue.textContent = 'Selecciona y copia';
                });
            });
        }
    }
    
    // Guardar la paleta actual
    function savePalette() {
        if (currentPalette.length === 0) {
            alert('Primero genera una paleta para guardar');
            return;
        }
        
        // Obtener paletas existentes o inicializar array
        const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];
        
        // Verificar si la paleta ya existe
        const paletteExists = savedPalettes.some(palette => 
            JSON.stringify(palette) === JSON.stringify(currentPalette)
        );
        
        if (paletteExists) {
            alert('Esta paleta ya está guardada');
            return;
        }
        
        // Añadir nueva paleta
        savedPalettes.push(currentPalette);
        
        // Guardar en localStorage
        try {
            localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
            renderSavedPalettes();
            
            // Feedback visual
            saveBtn.textContent = '✓ Guardado';
            setTimeout(() => {
                saveBtn.textContent = '💾 Guardar Paleta';
            }, 2000);
        } catch (e) {
            console.error('Error al guardar:', e);
            alert('No se pudo guardar la paleta. El almacenamiento puede estar lleno.');
        }
    }
    
    // Mostrar paletas guardadas
    function renderSavedPalettes() {
        let savedPalettes
