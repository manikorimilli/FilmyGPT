export const checkValidation = (email, password, name) => {

    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

    // name is only checked on the sign up form
    if (name !== undefined && name.trim().length < 3) return "Please enter your name (at least 3 characters).";
    if (!validEmail) return "Please enter a valid email address.";
    if (!validPassword) return "Password needs 8+ characters with an uppercase letter, a lowercase letter and a number.";

    return null;
}

// Turns Firebase auth error codes into messages people can act on
export const getAuthErrorMessage = (code) => {
    switch (code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Incorrect email or password. Please try again.";
        case "auth/email-already-in-use":
            return "An account with this email already exists. Try signing in.";
        case "auth/too-many-requests":
            return "Too many attempts. Please wait a moment and try again.";
        case "auth/network-request-failed":
            return "Network error. Check your connection and try again.";
        default:
            return "Something went wrong. Please try again.";
    }
}
