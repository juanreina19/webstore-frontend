const BASE_URL = "https://webstore-backend-lime.vercel.app/api"; // Ajusta si usas otro puerto

/**
 * Función genérica para realizar peticiones al backend.
 * Usa automáticamente el token del usuario o del admin si están disponibles.
 */
export const apiFetch = async (endpoint, method = "GET", body = null, customToken = null) => {
    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    const headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
    };

    // Determinar qué token usar
    const tokenToUse = customToken || adminToken || userToken;
    if (tokenToUse) headers["Authorization"] = `Bearer ${tokenToUse}`;

    const options = {
        method,
        headers,
    };

    if (body) options.body = JSON.stringify(body);

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, options);

        // ⚠️ Si el backend responde 204 (sin contenido)
        if (res.status === 204) return { message: "Sin contenido" };

        // ⚠️ Manejo de errores HTTP
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `Error ${res.status}`);
        }

        // ⚙️ Si la respuesta es JSON
        return await res.json();
    } catch (error) {
        console.error("❌ Error en apiFetch:", error.message);
        throw error;
    }
};
