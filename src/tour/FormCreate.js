import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import HomeTour from "./HomeTour";
import {useEffect, useState} from "react";
// import storage from './FirebaseConfig';
// import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";

export default function FormCreate() {
    const navigate = useNavigate()
    const [check, setCheck] = useState(false)

    const Validation = Yup.object().shape({
        title: Yup.string().required("Required!").min(3, "Too short!"),
        price: Yup.number().required("Required!").min(0, "Not price!")
            .max(20000000, "Too expensive!")
    })

    return (
        <>
            <div className={'container'}>
                <h1>Create tour</h1>
                <Formik
                    initialValues={{
                        title: "",
                        price: "",
                        description: "",
                    }}
                    onSubmit={(values) => {
                        save(values)
                    }}
                    validationSchema={Validation}>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <Field type="text" name={'title'} className="form-control" id="title"/>
                            <ErrorMessage name={'title'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <Field type="text" name={'price'} className="form-control" id="price"/>
                            <ErrorMessage name={'price'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <Field type="text" name={'description'} className="form-control" id="description"/>
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

    function save(values) {
        axios.post('http://localhost:3000/tours', values).then(() => {
            navigate('/')
        })
    }
}