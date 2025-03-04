export const responseMessage = {
    invalidToken: "Invalid Token",
    differentToken: "Different Token",
    tokenNotFound: "Token Not Found",
    alreadyEmail: "Already Email",
    signupSuccess: "Signup Success",
    internalServerError: "Internal Server Error",
    invalidUserPasswordEmail: "Invalid User or Password or Email",
    loginSuccess: "Login Success",
    customMessage: (message: string): any => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()}` },
    getDataSuccess: (message: string): any => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()} successfully retrieved!` },
    addDataSuccess: (message: string): any => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()} successfully added!` },
    addDataError: (message: string): any => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()} not added!` },
    getDataNotFound: (message: string): any => { return `We couldn't find the ${message.toLowerCase()} you requested!` },
    updateDataSuccess: (message: string): any => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()} has been successfully updated!` },
    updateDataError: (message: string): any => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()} updating time getting an error!` },
    deleteDataSuccess: (message: string): any => { return `Your ${message.toLowerCase()} has been successfully deleted!` },
    deleteDataNotSuccess: (message: string): any => { return `Your ${message.toLowerCase()} has been not successfully deleted!` },
}