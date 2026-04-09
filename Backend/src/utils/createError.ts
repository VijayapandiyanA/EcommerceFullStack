const createError = (message:string, statusCode:number)=>{
    const err:any = new Error(message)
    err.statusCode = statusCode
    err.success = false
    return err
}

export default createError