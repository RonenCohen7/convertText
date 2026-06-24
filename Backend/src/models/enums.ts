export enum StatusCode {
    
    // Successes: 
    OK = 200,
    Created = 201,
    NoContent = 204,

    // Client errors: 
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,

    // Server errors: 
    InternalServerError = 500
}

export enum Role {
    Admin = 1,
    User = 2
}

