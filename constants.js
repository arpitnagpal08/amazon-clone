exports.sessionMiddleware = {
    RESAVE: true,
    SAVEUNINITIALIZED: true,
    SECRET: "Budged09",
    AUTORECONNECT: true
}

exports.flash = {
    EMAIL_ALREADY_EXISTS: "Email already exists",
    SIGNUP_ERROR: "Unable to signup",
    NO_USER: "There is no user present",
    WRONG_PASSWORD: "OOPS! Wrong Password"
}

exports.passportMiddleware = {
    USERNAME_FIELD: "email",
    PASSWORD_FIELD: "password",
    PASS_REQ_TO_CALLBACK: true,
}