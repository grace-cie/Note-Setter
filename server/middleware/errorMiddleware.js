//export to the main js
export const errorHandler = (err, req, res, next) => {
     const statusCode = res.statusCode ? res.statusCode : 500//if thats in the contr use this

     res.status(statusCode)
     res.json({
          message: err.message,
          stack: process.env.NODE_ENV === 'production' ? null : err.stack
     })
}