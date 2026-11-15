import { useState, useEffect } from "react";

function FichaProducto({ id, onCerrar, onAgregar }) {
    const [ficha, setFicha] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarFicha() {
            setCargando(true);
            setError("");
            try {
                const response = await fetch(`/api/fichas/${id}.json`);
                if (!response.ok) {
                    throw new Error(`El servidor respondió ${response.status}`);
                }
                const datos = await response.json();
                setFicha(datos);
            } catch (e) {
                setError(e.message);
            } finally {
                setCargando(false);
            }
        }

        cargarFicha();
    }, [id]);

    return (
        <div className="fondo-panel" onClick={onCerrar}>
            <aside className="panel ficha" onClick={(e) => e.stopPropagation()}>
                <div className="ficha-cabeza">
                    <h2>Ficha técnica</h2>
                    <button className="boton-cerrar" onClick={onCerrar}>[ X ]</button>
                </div>

                {cargando && <p className="ficha-estado">Cargando ficha...</p>}

                {error !== "" && <p className="ficha-estado" style={{ color: "#ff6b6b" }}>Error: {error}</p>}

                {!cargando && error === "" && ficha && (
                    <>
                        <h3 style={{ color: "#61dafb" }}>{ficha.nombre}</h3>
                        
                        <div className="ficha-dato">
                            <strong>Fabricante</strong>
                            <span>{ficha.fabricante}</span>
                        </div>

                        <div className="ficha-dato">
                            <strong>Descripción</strong>
                            <span>{ficha.descripcion}</span>
                        </div>

                        <div className="ficha-dato">
                            <strong>Naves compatibles</strong>
                            <ul>
                                {ficha.compatibilidad.map((nave, index) => (
                                    <li key={index}>{nave}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="ficha-dato">
                            <strong>Stock disponible</strong>
                            <span>{ficha.stock} unidades</span>
                        </div>

                        {ficha.stock === 0 ? (
                            <span className="agotado">Agotado</span>
                        ) : (
                            <button className="boton-agregar" onClick={() => onAgregar(ficha)}>
                                Agregar al carrito
                            </button>
                        )}
                    </>
                )}
            </aside>
        </div>
    );
}

export default FichaProducto;