export const validateSchema = (schema) => (req, res, next) => {
    try{
        schema.parse(req.body);
        next();
    }catch(e){
        res
        .status(400)
        .json({message: e.errors.map(error => error.message)});
    }
}