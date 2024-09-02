// Clase Producto: Representa un producto que se puede agregar al carrito.
class Producto {
    // Constructor que inicializa los atributos del producto.
    constructor(nombre, marca, categoria, urlImage, precio, stock) {
        this.nombre = nombre; // Nombre del producto.
        this.marca = marca; // Marca del producto.
        this.categoria = categoria; // Categoría del producto.
        this.urlImage = urlImage; // URL de la imagen del producto.
        this.precio = parseFloat(precio); // Precio del producto convertido a número con decimales.
        this.stock = parseInt(stock); // Stock del producto convertido a número entero.
    }

    // Método para actualizar el stock después de una venta.
    venta(cantidad) {
        this.stock -= cantidad; // Resta la cantidad vendida del stock del producto.
    }

    // Método para obtener el nombre completo del producto.
    nombreCompleto() {
        // Devuelve el nombre y la marca del producto en una sola cadena de texto.
        return `${this.nombre} - ${this.marca}`;
    }
}

// Clase Compra: Maneja el proceso de agregar productos al carrito y calcular los totales.
class Compra {
    // Constructor que inicializa el carrito de compras.
    constructor() {
        this.productos = []; // Array para almacenar los productos en el carrito.
        this.subtotal = 0; // Subtotal de la compra inicializado en 0.
        this.total = 0; // Total de la compra inicializado en 0.
    }

    // Método para agregar un producto al carrito de compras.
    agregarProducto(producto, cantidad) {
        // Añade un objeto con el producto y la cantidad al array de productos.
        this.productos.push({ producto, cantidad });
        this.actualizarSubtotal(); // Actualiza el subtotal después de agregar el producto.
    }

    // Método para calcular y actualizar el subtotal de la compra.
    actualizarSubtotal() {
        // Calcula el subtotal sumando el precio de cada producto multiplicado por la cantidad.
        this.subtotal = this.productos.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
    }

    // Método para calcular el total de la compra, incluyendo impuestos y recargos.
    calcularTotal(conTarjeta) {
        const impuestos = this.subtotal * 0.21; // Calcula el 21% de impuestos sobre el subtotal.
        this.total = this.subtotal + impuestos; // Suma los impuestos al subtotal para obtener el total.

        // Si el pago es con tarjeta, añade un recargo del 10% al total.
        if (conTarjeta) {
            this.total += this.total * 0.1;
        }
    }

    // Método para generar e imprimir el ticket de compra.
    imprimirTicket() {
        const detalleTicket = document.getElementById('detalleTicket'); // Obtiene el elemento HTML donde se mostrará el ticket.

        // Genera el contenido HTML para el ticket de compra.
        detalleTicket.innerHTML = `
            <p><strong>Productos Comprados:</strong></p>
            <ul>
                ${this.productos.map(item => `<li>${item.cantidad} x ${item.producto.nombreCompleto()} - $${item.producto.precio.toFixed(2)}</li>`).join('')}
            </ul>
            <p><strong>Subtotal:</strong> $${this.subtotal.toFixed(2)}</p>
            <p><strong>Total:</strong> $${this.total.toFixed(2)}</p>
        `;

        // Muestra el ticket en la página quitando la clase que lo oculta.
        document.getElementById('ticket').classList.remove('d-none');
    }
}

// Inicializa una nueva instancia de Compra para manejar el carrito de compras.
const compra = new Compra();
const carritoElement = document.getElementById('carrito'); // Elemento HTML donde se mostrará el carrito.
const subtotalElement = document.getElementById('subtotal'); // Elemento HTML donde se mostrará el subtotal.

// Maneja el envío del formulario de productos.
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene que la página se recargue al enviar el formulario.

    // Obtiene los valores del formulario.
    const nombre = document.getElementById('nombre').value;
    const marca = document.getElementById('marca').value;
    const categoria = document.getElementById('categoria').value;
    const urlImage = document.getElementById('urlImage').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    // Crea un nuevo objeto Producto con los valores del formulario.
    const nuevoProducto = new Producto(nombre, marca, categoria, urlImage, precio, stock);

    // Agrega el nuevo producto al carrito con cantidad 1.
    compra.agregarProducto(nuevoProducto, 1);

    // Actualiza la visualización del carrito en la página.
    actualizarCarrito();
    this.reset(); // Limpiar el formulario después de agregar el producto.
});

// Función para actualizar visualmente el carrito utilizando tarjetas.
function actualizarCarrito() {
    carritoElement.innerHTML = ''; // Limpia el contenido actual del carrito.

    // Recorre los productos en el carrito y crea una tarjeta (card) para cada uno.
    compra.productos.forEach(item => {
        const card = document.createElement('div'); // Crea un contenedor para la tarjeta.
        card.className = 'card mb-3'; // Aplica la clase para el estilo de la tarjeta.
        card.style = 'max-width: 540px;'; // Define un ancho máximo para la tarjeta.

        const row = document.createElement('div'); // Crea una fila para la tarjeta.
        row.className = 'row g-0'; // Aplica la clase para el diseño de la fila.

        const colImage = document.createElement('div'); // Crea una columna para la imagen del producto.
        colImage.className = 'col-md-4'; // Aplica la clase para el diseño de la columna.
        const img = document.createElement('img'); // Crea un elemento de imagen.
        img.src = item.producto.urlImage; // Establece la URL de la imagen del producto.
        img.className = 'img-fluid rounded-start'; // Aplica estilos para que la imagen sea fluida y redondeada.
        img.alt = item.producto.nombre; // Define el texto alternativo de la imagen.

        colImage.appendChild(img); // Añade la imagen a la columna de imagen.

        const colBody = document.createElement('div'); // Crea una columna para el contenido de la tarjeta.
        colBody.className = 'col-md-8'; // Aplica la clase para el diseño de la columna.
        const cardBody = document.createElement('div'); // Crea un contenedor para el cuerpo de la tarjeta.
        cardBody.className = 'card-body'; // Aplica la clase para el diseño del cuerpo de la tarjeta.

        const cardTitle = document.createElement('h5'); // Crea un elemento para el título de la tarjeta.
        cardTitle.className = 'card-title'; // Aplica la clase para el diseño del título.
        cardTitle.textContent = item.producto.nombreCompleto(); // Establece el texto del título con el nombre completo del producto.

        const cardText = document.createElement('p'); // Crea un elemento para el texto de la tarjeta.
        cardText.className = 'card-text'; // Aplica la clase para el diseño del texto.
        cardText.innerHTML = `<strong>Cantidad:</strong> ${item.cantidad}<br><strong>Precio:</strong> $${item.producto.precio.toFixed(2)}`; // Define el contenido del texto con la cantidad y el precio del producto.

        cardBody.appendChild(cardTitle); // Añade el título al cuerpo de la tarjeta.
        cardBody.appendChild(cardText); // Añade el texto al cuerpo de la tarjeta.

        colBody.appendChild(cardBody); // Añade el cuerpo de la tarjeta a la columna de contenido.
        row.appendChild(colImage); // Añade la columna de imagen a la fila.
        row.appendChild(colBody); // Añade la columna de contenido a la fila.

        card.appendChild(row); // Añade la fila (con la imagen y el contenido) a la tarjeta.
        carritoElement.appendChild(card); // Añade la tarjeta al elemento del carrito en la página.
    });

    subtotalElement.textContent = compra.subtotal.toFixed(2); // Actualiza el subtotal mostrado en la página.
}

// Evento de finalizar compra.
document.getElementById('finalizarCompra').addEventListener('click', function() {
    const conTarjeta = confirm('¿Desea pagar con tarjeta de crédito? (se aplica un 10% adicional)');
    compra.calcularTotal(conTarjeta); // Calcula el total con o sin recargo por tarjeta.
    compra.imprimirTicket(); // Genera e imprime el ticket de compra.
});

// Evento de volver al inicio.
document.getElementById('volverInicio').addEventListener('click', function() {
    location.reload(); // Recarga la página para empezar una nueva compra.
});

// Evento de imprimir el ticket.
document.getElementById('imprimirTicket').addEventListener('click', function() {
    window.print(); // Abre el diálogo de impresión del navegador para imprimir el ticket.
});
