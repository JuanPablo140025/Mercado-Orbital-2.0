import Cargando from "./Cargando.jsx";
import ErrorCatalogo from "./ErrorCatalogo.jsx";
import CatalogoVacio from "./CatalogoVacio.jsx";
import TarjetaProducto from "./TarjetaProducto.jsx";

function Catalogo({ productos, cargando, error, onReintentar, onAgregar, onVerFicha }) {
    if (cargando) return <Cargando />;
    if (error !== "") return <ErrorCatalogo mensaje={error} onReintentar={onReintentar} />;
    if (productos.length === 0) return <CatalogoVacio />;

    return (
        <main className="catalogo">
            {productos.map((producto) => (
                <TarjetaProducto
                    key={producto.id}
                    producto={producto}
                    onAgregar={onAgregar}
                    onVerFicha={onVerFicha}
                />
            ))}
        </main>
    );
}

export default Catalogo;