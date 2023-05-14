import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
// import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
// import storage from "./FirebaseConfig";

export default function FormUpdate() {
    const navigate = useNavigate()
    const param = useParams()
    const [tour, setTour] = useState({})
    const [check, setCheck] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3000/tours/${param.id}`).then((response) => {
            setTour(response.data)
        })
    }, [])

    const Validation = Yup.object().shape({
        title: Yup.string().required("Required!").min(3, "Too short!"),
        price: Yup.number().required("Required!").min(0, "Not price!")
            .max(20000000, "Too expensive!")
    })

    return (
        <>
            <div className={'container'}>
                <h1>Update tour</h1>
                <Formik
                    initialValues={{
                        title: tour.title,
                        price: tour.price,
                        description: tour.description,
                    }}
                    onSubmit={(values) => {
                        save(values)
                    }}
                    validationSchema={Validation}
                    enableReinitialize={true}>
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
                            <button disabled={check} className={'btn btn-primary'}>Update</button>
                            &ensp;
                            <Link className={'btn btn-danger'} to={'/'}>Back</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )

    function save(values) {
        axios.put(`http://localhost:3000/tours/${param.id}`, values).then(() => {
            navigate('/')
        })

    }
}