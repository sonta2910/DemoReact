import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as path from "path";

const SearchProduct = () => {
    const [products, setProducts] = useState([]);

    const initialValues = {
        name: "",
        maxPrice: "",
    };

    function onSubmit (values) {
        axios.get(`http://localhost:8080/products/searchProduct?name=${values.name}&price=${values.price}`).then((response) => {
            setProducts(response.data);
        })
    };

    return (
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

            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchProduct;