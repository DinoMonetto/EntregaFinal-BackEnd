// se exporta una función llamada errorHandler como una constante
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo mal ha ocurrido!');
};
