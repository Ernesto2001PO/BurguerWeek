const db = require("../models/");


exports.createCalificacion = async (req, res) => {
    const { hamburguesa_id, puntuacion, probada } = req.body;


    console.log("Datos recibidos:", {
        hamburguesa_id,
        puntuacion, 
        probada: typeof probada, 
        probada_value: probada 
    });

    try {
        // Validación básica
        if (!hamburguesa_id || !puntuacion) {
            return res.status(400).json({
                error: "Faltan campos requeridos: hamburguesa_id y puntuacion"
            });
        }

        const calificacionData = {
            hamburguesa_id: parseInt(hamburguesa_id),
            puntuacion: parseInt(puntuacion),
            probada: probada === true || probada === 'true' 
        };

        // Validar rango de puntuación
        if (calificacionData.puntuacion < 1 || calificacionData.puntuacion > 5) {
            return res.status(400).json({
                error: "La puntuación debe estar entre 1 y 5"
            });
        }

        console.log("Guardando calificación:", calificacionData);
        const nuevaCalificacion = await db.Calificacion.create(calificacionData);

        console.log("Calificación guardada:", nuevaCalificacion);
        res.status(201).json({
            success: true,
            message: "Calificación guardada exitosamente",
            calificacion: nuevaCalificacion
        });
    
    } catch (error) {
        console.error("Error al guardar la calificación:", error);
        res.status(500).json({
            error: "Error al guardar la calificación",
            details: error.message
        });
    }
};