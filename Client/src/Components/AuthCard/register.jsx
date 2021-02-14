import React, { useState, useEffect } from 'react'
import { Form, Button, Dropdown } from 'react-bootstrap';
import Axios from 'axios';

// import Error from './errorMsg';

const Register = ({ toLogin }) => {

    // const kerjaRef = useRef();
    const [registerData, setRegisterData] = useState({});
    const [error, setError] = useState({});

    const [gender, setGender] = useState('');
    const [provinsi, setProvinsi] = useState([]);
    const [kabupaten, setKabupaten] = useState([]);
    const [pekerjaan, setPekerjaan] = useState([]);

    const [provTerpilih, setProvTerpilih] = useState('');
    const [kabupatenTerpilih, setKabupatenTerpilih] = useState('');
    const [pekerjaanTerpilih, setPekerjaanTerpilih] = useState('');
    const [filterKerja, setFilterKerja] = useState([]);
    const [showfilterKerja, setShowfilterKerja] = useState(false);


    let gend = gender === '' ? 'Jenis kelamin' : gender;
    let provv = provTerpilih === '' ? 'Pilih provinsi' : provTerpilih;
    let kab = kabupatenTerpilih === '' ? 'Pilih Kabupaten' : kabupatenTerpilih;
    let kerja = pekerjaanTerpilih === '' ? '' : pekerjaanTerpilih;

    const fetchProvinsi = Axios.get('http://localhost:5000/auth/provinsi');
    const fetchPekerjaan = Axios.get('http://localhost:5000/auth/pekerjaan');

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = () => {
        Axios.all([fetchProvinsi, fetchPekerjaan])
            .then(Axios.spread((...res) => {
                setProvinsi(res[0].data);
                setPekerjaan(res[1].data)
            }))
            .catch((err) => {
                console.log(err);
            })
    }

    const selectProv = (id, name) => {
        // console.log(id, name);
        setProvTerpilih(name);
        setRegisterData(prevState => ({
            ...prevState,
            asal_provinsi: id
        })
        )
        setKabupatenTerpilih('')

        Axios.get(`http://localhost:5000/auth/kabupaten/${id}`)
            .then((res) => {
                setKabupaten(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const selectKab = (id, nama) => {
        // console.log(id, nama)
        setKabupatenTerpilih(nama)
        setRegisterData(prevState => ({
            ...prevState,
            asal_kabupaten: id
        })
        )
    }

    const selectGender = (e) => {
        // console.log(e);
        e.preventDefault();
        setGender(e.target.outerText);
        setRegisterData(prevState => ({
            ...prevState,
            jenis_kelamin: e.target.outerText
        })
        )
    }

    const setKerja = (id, nama) => {
        setPekerjaanTerpilih(nama);
        setShowfilterKerja(false)
        setRegisterData(prevState => ({
            ...prevState,
            pekerjaan: id
        })
        )
    }

    const selectPekerjaan = async (e) => {
        const input = e.target.value;
        await setPekerjaanTerpilih(input);

        const lng = input.length;
        const spltInput = input.toLowerCase()
        const result = []
        if (lng > 0) {
            pekerjaan.forEach((job) => {
                const lowerCaseJob = job.nama_pekerjaan.toLowerCase();
                // const splt = lowerCaseJob.split('');
                const splt = lowerCaseJob.match(new RegExp('.{1,' + lng + '}', 'g'));

                const res = splt.includes(spltInput)
                // const res = spltInput.every(i=> splt.includes(i));
                if (res === true) {
                    result.push(job)
                }
            })
        }
        await setFilterKerja(result);
        if (filterKerja.length > 0) {
            await setShowfilterKerja(true)
        } else {
            await setShowfilterKerja(false)
        }
    }

    const dataOnChange = (e) => {
        const { value, id } = e.target;
        setRegisterData(prevState => ({
            ...prevState,
            [id]: value
        })
        )
    }

    const submit = () => {
        setError({});
        Axios.post('http://localhost:5000/users/register', registerData)
            .then((res) => {
                // console.log(res);
                if (res.data.errors) {
                    setError(res.data.errors);
                    // console.log(res);
                    // alert(res.data.errors)
                } else if (res.status === 200) {
                    alert("Anda berhasil didaftarkan");
                    window.location.reload({ forceReload: false })
                }
            })
            .catch(err => console.log(err))
    }



    return (
        <div >
            <h3><strong>Register</strong></h3>
            <Form>

                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" placeholder="Nama" id="nama_member" onChange={dataOnChange} />
                < small style={{ color: 'red', margin: 0 }}>{error.nama}</small>
                <br />


                <Form.Label>Asal Provinsi</Form.Label>
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic dd-provinsi">
                        {provv}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {provinsi.map((prv) => {
                            return <Dropdown.Item key={prv.id} onClick={() => selectProv(prv.id, prv.name)} >{prv.name}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <br />


                <Form.Label>Asal Kabupaten</Form.Label>
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic dd-kabupaten">
                        {kab}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {kabupaten.length === 0 ? 'Pilih provinsi dahulu' :
                            kabupaten.map((kt) => {
                                return <Dropdown.Item key={kt.id} onClick={() => selectKab(kt.id, kt.name)} >{kt.name}</Dropdown.Item>
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <br />

                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="user@mail.com" id="email" onChange={dataOnChange} />
                < small style={{ color: 'red', margin: 0 }}>{error.email}</small>
                <br />


                <Form.Label>Nomor HP</Form.Label>
                <Form.Control type="text" placeholder="08##" id="hp" onChange={dataOnChange} />
                <br />


                <Form.Label>Jenis Kelamin</Form.Label>
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic dd-jeniskelamin">
                        {gend}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={selectGender} >Laki-laki</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={selectGender} >Perempuan</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br />


                <Form.Label>Pekerjaan</Form.Label>
                <Form.Control type="text" onChange={selectPekerjaan} value={kerja} placeholder="Pekerjaan" />
                {showfilterKerja === true && filterKerja.length > 0 ?
                    <div className="dd2">
                        {filterKerja.map((job) =>
                            <Dropdown.Item key={job.id_pekerjaan} onClick={() => setKerja(job.id_pekerjaan, job.nama_pekerjaan)}>
                                {job.nama_pekerjaan}
                            </Dropdown.Item>
                        )}
                    </div>
                    : null
                }
                < br />


                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="*******" id="password" onChange={dataOnChange} />
                <br />


                <div style={{ float: 'right' }}>
                    <Button onClick={submit}>Daftar</Button>
                    <br /><br />
                    <small>Sudah punya akun?</small><br />
                    <a href="/" className="navlink-link2" onClick={toLogin}>
                        <strong>Login sekarang!</strong>
                    </a>
                </div>
            </Form>
        </div >
    )
}

export default Register
