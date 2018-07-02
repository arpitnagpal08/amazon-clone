exports.sessionMiddleware = {
    RESAVE: true,
    SAVEUNINITIALIZED: true,
    SECRET: "Budged09",
    AUTORECONNECT: true
}

exports.userFlashMessage = {
    EMAIL_ALREADY_EXISTS: "Email already exists",
    SIGNUP_ERROR: "Unable to signup",
    NO_USER: "There is no user present",
    WRONG_PASSWORD: "OOPS! Wrong Password",
    PROFILE_SUCCSS: "Successfully edited your profile"
}

exports.adminFlashMessage = {
    SUCCESSFULLY_ADDED_CATEGORY: "Successfully added category",
    ALREADY_EXISTS: "Category already exists",
    SUCCESSFULLY_ADDED_PRODUCT: "Successfully added products"
}

exports.passportMiddleware = {
    USERNAME_FIELD: "email",
    PASSWORD_FIELD: "password",
    PASS_REQ_TO_CALLBACK: true,
}