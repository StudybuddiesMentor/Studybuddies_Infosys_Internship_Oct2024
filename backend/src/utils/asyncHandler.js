const asyncHandler = (requestHandler) => {
    (req , res , next) => {
    return Promise.resolve(requestHandler(req , res , next)).
        catch((err) => next(err))
    }
}


export {asyncHandler}


