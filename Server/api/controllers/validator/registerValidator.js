module.exports = function validateRegister(data) {
    let errors = {};

    //isEmpty validation
    data.nama_member === "" || !data.nama_member ? errors.nama = "Nama Tidak Boleh Kosong" : null;
    data.email === "" ? errors.email = "Email Tidak Boleh Kosong" : null;
    data.hp === "" ? errors.hp = "Nomor HP Tidak Boleh Kosong" : null;
    data.asal_provinsi === "" ? errors.asal_provinsi = "Provinsi Tidak Boleh Kosong" : null;
    data.asal_kabupaten === "" ? errors.asal_kabupaten = "Kabupaten Tidak Boleh Kosong" : null;
    data.password === "" ? errors.password = "Password tidak boleh kosong" : null;

    //rule validation
    data.password.length < 8 ? errors.password = "Password tidak boleh kurang dari 8 karakter" : null;

    return { errors };
}