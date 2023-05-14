import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik} from "formik";
//upload file
import {storage} from '../FirebaseConfig';
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";

export default function FormCreate(){
    const [imgUrl, setImgUrl] = useState('');
    const [progressPercent, setProgressPercent] = useState(0);
    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [check, setCheck] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/products/categories').then((response) => {
            setCategory(response.data)
        })
    }, [])

    const Validation = Yup.object().shape({
        name: Yup.string().required("Required!").min(3, "Too short!"),
        price: Yup.number().required("Required!").min(0, "Not price!")
            .max(20000000, "Too expensive!"),
        category: Yup.string().required('Category is required')
    })

    return (
        <>
            <div className={'container'}>
                <h1>Create product</h1>
                <Formik
                    initialValues={{
                        name: "",
                        price: "",
                        imagePath:"",
                        category: {
                            id: ""
                        }
                    }}
                    onSubmit={(values) => {
                        save(values)
                    }}
                    validationSchema={Validation}>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field type="text" name={'name'} className="form-control" id="name"/>
                            <ErrorMessage name={'title'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <Field type="text" name={'price'} className="form-control" id="price"/>
                            <ErrorMessage name={'price'}/>
                        </div>
                        <div>
                                <label htmlFor="image">Image</label>

                                    <img style={{width: '100px', height: '100px'}} src={null} alt=""/>
                                <input type="file" onChange={(e) => {
                                    uploadFile(e)
                                }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <Field as={'select'} name={'category.id'}  className="form-control" id="category">
                                <option value={''}>-----------</option>
                                {category.map((item, id) => (
                                    <option key={id} value={item.id}>{item.name}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="mb-3">
                            <button disabled={check} type={"submit"} className={'btn btn-primary'}>Create</button>
                            &ensp;
                            <Link className={'btn btn-danger'} to={'/'}>Back</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
    function uploadFile(e) {
        const file = e.target.files[0]

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressPercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                });
            }
        );
    }
    function save(values) {
        values.imagePath = imgUrl
        axios.post('http://localhost:8080/products/create-product', values).then(() => {
            navigate('/')
        })
    }
}