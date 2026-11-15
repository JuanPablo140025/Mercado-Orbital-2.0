function TarjetaProducto({ producto, onAgregar, onVerFicha }) {
    return (
        <article className="tarjeta">
            <img src={producto.imagen} alt={producto.nombre} className="tarjeta-imagen" />
            <span className="etiqueta">{producto.categoria}</span>
            <h3>{producto.nombre}</h3>
            <p className="precio">{producto.precio} cr</p>
            <div className="tarjeta-botones" style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
                <button className="boton-agregar" onClick={() => onAgregar(producto)}>
                    Agregar al carrito
                </button>
                {onVerFicha && (
                    <button className="boton-ficha" onClick={() => onVerFicha(producto.id)}>
                        Ver ficha
                    </button>
                )}
            </div>
        </article>
    );
}

export default TarjetaProducto;
