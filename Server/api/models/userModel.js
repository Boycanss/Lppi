const UserModel = (req, res) => {
    const sql = req.app.get('db');

    const Member = sql.define('member', {
        id_member: {
            type: sql.STRING,
        },
        nama_member: {
            type: sql.STRING,
        },
        asal_provinsi: {
            type: sql.NUMBER,
        },
        asal_kabupaten: {
            type: sql.NUMBER,
        },
        email: {
            type: sql.STRING,
        },
        hp: {
            type: sql.STRING,
        },
        jenis_kelamin: {
            type: sql.STRING,
        },
        pekerjaan: {
            type: sql.NUMBER,
        },
        password: {
            type: sql.STRING
        }
    })
}