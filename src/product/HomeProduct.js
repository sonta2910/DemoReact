import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";
//upload file
import {storage} from '../FirebaseConfig';
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";

export default function HomeProduct() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/products/view-products').then((response) => {
            setProducts([...response.data])
        })
    }, [])

    return (
        <>
            <div className={'container'}>
                <h1>List products</h1>
                <div>
                    <Formik initialValues={{
                        products: {
                            name: "",
                            price: "",
                        },
                    }} onSubmit={(values) =>
                    {
                        onSubmit(values)
                    }
                    }>
                        <Form>
                            <label htmlFor="name">Product Name:</label>
                            <Field id="name" name="name" placeholder="Enter product name" />

                            <label htmlFor="price"> Price:</label>
                            <Field id="price" name="price" placeholder="Enter price" />

                            <button type="submit">Search</button>
                        </Form>
                    </Formik>
                </div>

                <div className={'row'}>
                    <div className={'col-8'}>
                        <Link className={'btn btn-primary'} to={'/create-product'}>Create new product</Link> &nbsp;
                    </div>
                </div>
                <table border={1} className={'table table-striped text-center'}>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>CateGory</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    {item.name}
                                </td>
                                <td>{item.price}</td>
                                <td><img style={{width: '100px', height: '100px'}}
                                         src={item.imagePath} alt=""/></td>
                                <td>{item.category.name}</td>
                                <td>
                                    <Link className={'btn btn-success'} to={`/update-product/${item.id}`}>Update</Link>
                                </td>
                                <td>
                                    <button type={"button"} onClick={() => deleteProduct(item.id)}
                                            className={'btn btn-danger'}>Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
    function onSubmit (values) {
        axios.get(`http://localhost:8080/products/searchProduct?name=${values.name}&price=${values.price}`).then((response) => {
            setProducts(response.data);
        })
    };

    function deleteProduct(id) {
        if (window.confirm("Are you sure?")) {
            axios.delete(`http://localhost:8080/products/delete-product/${id}`).then(() => {
                axios.get('http://localhost:8080/products/view-products').then((response) => {
                    setProducts(response.data)
                })
            })
        }
    }

}