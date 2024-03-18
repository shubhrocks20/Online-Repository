import  Joi  from 'joi';
const ErrorHandling = (err, req, res, next)=>{
    let statusCode = 500;
    let data = {
        message: 'Internal server error',
    }
    if(err instanceof Joi.ValidationError){
        statusCode = 422;
        data = {
            message: err.message,
        }
    }

    return res.status(statusCode).json(data);
}
export default ErrorHandling;