import { useState, useEffect } from "react";
import Encabezado from "./components/Encabezado.jsx";
import TarjetaProducto from "./components/TarjetaProducto.jsx";
import PanelCarrito from "./components/PanelCarrito.jsx";
import Aviso from "./components/Aviso.jsx";
import OfertaRelampago from "./components/OfertaRelampago.jsx";
import { productos } from "./data/productos.js";

function App() {
    // Estado de la tienda
    const [carrito, setCarrito] = useState([]);
    const [aviso, setAviso] = useState("");
    const [carritoAbierto, setCarritoAbierto] = useState(false);

    // Estado elevado para la oferta relámpago (Ticket 1 + Extra)
    const [segundosOferta, setSegundosOferta] = useState(60);

    // Calculamos el catálogo con el descuento activo si quedan segundos (Extra)
    const ofertaActiva = segundosOferta > 0;
    const catalogoActual = productos.map((prod) =>
        prod.id === 7 && ofertaActiva ? { ...prod, precio: 450 } : prod
    );

    // Valores calculados a partir del carrito
    const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const totalPrecio = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    function agregarAlCarrito(producto) {
        const yaEsta = carrito.some((item) => item.id === producto.id);

        if (yaEsta) {
            setCarrito(carrito.map((item) =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1, precio: producto.precio }
                    : item
            ));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }

        setAviso(`Agregaste ${producto.nombre} al carrito`);
    }

    function quitarDelCarrito(id) {
        setCarrito(carrito.filter((item) => item.id !== id));
    }

    // Ticket Clase 1 · La pestaña cuenta el carrito
    useEffect(() => {
        document.title = `(${totalUnidades}) Mercado Orbital`;
    }, [totalUnidades]);

    // Ticket Clase 2 · El aviso se borra solo
    useEffect(() => {
        if (aviso === "") return;

        const id = setTimeout(() => {
            setAviso("");
        }, 2500);

        return () => clearTimeout(id);
    }, [aviso]);

    // Ticket Clase 3 · Escape cierra el carrito
    useEffect(() => {
        function manejarTecla(e) {
            if (e.key === "Escape") {
                setCarritoAbierto(false);
            }
        }

        window.addEventListener("keydown", manejarTecla);

        return () => window.removeEventListener("keydown", manejarTecla);
    }, []);

    return (
        <div className="app">
            <Encabezado
                totalUnidades={totalUnidades}
                onAbrirCarrito={() => setCarritoAbierto(true)}
            />

            <section className="bienvenida">
                <img src="/img/nova-tienda.png" alt="Nova en el mostrador del Mercado Orbital" />
                <div>
                    <h2>Bienvenido al puesto de Nova</h2>
                    <p>Repuestos revisados uno por uno en el hangar. Si algo falla, Kuma lo arregla.</p>
                </div>
            </section>

            {/* Ticket 1 · Oferta relámpago entre bienvenida y catálogo */}
            <OfertaRelampago
                segundos={segundosOferta}
                setSegundos={setSegundosOferta}
            />

            <main className="catalogo">
                {catalogoActual.map((producto) => (
                    <TarjetaProducto
                        key={producto.id}
                        producto={producto}
                        onAgregar={agregarAlCarrito}
                    />
                ))}
            </main>

            <Aviso mensaje={aviso} />

            {carritoAbierto && (
                <PanelCarrito
                    items={carrito}
                    total={totalPrecio}
                    onCerrar={() => setCarritoAbierto(false)}
                    onQuitar={quitarDelCarrito}
                />
            )}
        </div>
    );
}

export default App;