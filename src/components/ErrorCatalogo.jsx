function ErrorCatalogo({ mensaje, onReintentar }) {
    return (
        <div className="estado-catalogo error-catalogo" role="alert">
            <svg className="icono-estado" viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="7" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="17" r="1.3" fill="currentColor" />
            </svg>
            <p className="estado-titulo">El almacén no respondió</p>
            <p className="estado-detalle">{mensaje}</p>
            <button className="boton-reintentar" onClick={onReintentar}>Reintentar</button>
        </div>
    );
}

export default ErrorCatalogo;