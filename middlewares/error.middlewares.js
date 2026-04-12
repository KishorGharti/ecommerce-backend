export const errorMiddleware = async(req,res,next,err) =>{
    res.status(err.status || 500).json({
        success : false,
        message:err.message || "something went wrong"
    })
}