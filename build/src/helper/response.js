"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMessage = void 0;
exports.responseMessage = {
    invalidToken: "Invalid Token",
    differentToken: "Different Token",
    tokenNotFound: "Token Not Found",
    alreadyEmail: "Already Email",
    signupSuccess: "Signup Success",
    internalServerError: "Internal Server Error",
    invalidUserPasswordEmail: "Invalid User or Password or Email",
    loginSuccess: "Login Success",
    customMessage: (message) => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()}`; },
    getDataSuccess: (message) => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()} successfully retrieved!`; },
    addDataSuccess: (message) => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()} successfully added!`; },
    addDataError: (message) => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()} not added!`; },
    getDataNotFound: (message) => { return `We couldn't find the ${message.toLowerCase()} you requested!`; },
    updateDataSuccess: (message) => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()} has been successfully updated!`; },
    updateDataError: (message) => { return `${message[0].toUpperCase() + message.slice(1).toLowerCase()} updating time getting an error!`; },
    deleteDataSuccess: (message) => { return `Your ${message.toLowerCase()} has been successfully deleted!`; },
    deleteDataNotSuccess: (message) => { return `Your ${message.toLowerCase()} has been not successfully deleted!`; },
};
//# sourceMappingURL=response.js.map