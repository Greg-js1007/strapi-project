export function FormError({ error }) {
    // Si no hay error, no renderizamos nada
    if (!error) return null;

    // Si el error existe, mapeamos el array de mensajes
    return error.map((err, index) => (
        <div key={index} className="text-pink-500 text-xs italic mt-1 py-2">
            {err}
        </div>
    ));
}
