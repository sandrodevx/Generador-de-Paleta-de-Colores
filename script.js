const palette = document.getElementById('palette');
const generateBtn = document.getElementById('generate-btn');
const savedPalettes = document.getElementById('saved-palettes');

// Función para generar un color hexadecimal aleatorio
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Función para generar una paleta de 5 colores
function generatePalette() {
    palette.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const color = getRandomColor();
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color';
        colorDiv.style.backgroundColor = color;
        colorDiv.textContent = color;
        palette.appendChild(colorDiv);
    }
}

// Generar una paleta al cargar la página
generatePalette();

// Generar una nueva paleta al hacer clic en el botón
generateBtn.addEventListener('click', generatePalette);