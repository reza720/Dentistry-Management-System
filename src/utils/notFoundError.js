const notFoundError=(x)=>{
    const err=new Error(`${x} not found`);
    err.statusCode=404;
    throw err;
};
module.exports=notFoundError;