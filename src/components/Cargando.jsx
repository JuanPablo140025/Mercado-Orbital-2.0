function Cargando() {
    return (
        <div className="estado-catalogo cargando" role="status">
            <span className="anillo" aria-hidden="true"></span>
            <p className="estado-titulo">Pedido en camino</p>
            <p className="estado-detalle">Pidiendo el catálogo al almacén central de la estación...</p>
        </div>
    );
}

export default Cargando;