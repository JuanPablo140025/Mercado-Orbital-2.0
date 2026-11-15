function CatalogoVacio() {
    return (
        <div className="estado-catalogo catalogo-vacio">
            <img src="/img/nova-carrito-vacio.png" alt="Nova junto a una caja vacía" />
            <p className="estado-titulo">Sin stock</p>
            <p className="estado-detalle">El almacén central no mandó repuestos hoy. Nova ya pidió más.</p>
        </div>
    );
}

export default CatalogoVacio;