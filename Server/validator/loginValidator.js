module.exports = function validateLogin(data) {
    let errors = {};

    //isEmpty validation
    data.email === "" ? errors.email = "Silahkan isi email" : null;
    data.password === "" ? errors.password = "Silahkan isi email password" : null;

    //rule validation
    data.password.length < 8 ? errors.password = "Password tidak boleh kurang dari 8 karakter" : null;

    return { errors };
}