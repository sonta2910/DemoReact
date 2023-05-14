import {useEffect, useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export  default function FormCity(){
    const [city, setCity] = useState({})
    const [nations, setNations] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/cities/nations").then(response => {
            setNations(response.data)
        }).catch(() => {
            console.log("Haha")
        })
    },[])


    const [check, setCheck] = useState(true)
    const navigate = useNavigate();
    const validation = Yup.object().shape({
        id: Yup.string().matches(/[0-9]/,"Invalid"),
        name: Yup.string().min(6, "Too short"),
        area: Yup.number().min(18, "Too small").max(6000, "Too big").required("Required!"),
        population: Yup.number().min(18, "Too less").max(6000, "Too big").required("Required!"),
    })
    return (
        <>
            <h1 id={'title'}>Form create</h1>
            <Formik
                initialValues={{
                    name : "",
                    area: "",
                    population: "",
                    gpd:"",
                    description:"",
                    nation:{
                         id: ''
                    }
            }
            }
                onSubmit={(values) => {
                    if (check) {
                        createCity(values)
                    }
                }}
                enableReinitialize={true}
                validationSchema={validation}
            >
                <Form>
                    <table>
                        <tr hidden={!check}>
                            <td><label htmlFor="id">Id</label></td>
                            <td><Field  name={'id'} id={'id'}></Field>
                                <ErrorMessage name={'id'}/>
                                <br/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="name">Name</label></td>
                            <td><Field name={'name'}></Field>
                                <ErrorMessage name={'name'}/>
                                <br/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="area">Area</label></td>
                            <td><Field name={'area'}></Field>
                                <ErrorMessage name={'area'}/>
                                <br/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="population">Population</label></td>
                            <td><Field name={'population'}></Field><br/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="gpd">GDP</label></td>
                            <td><Field name={'gpd'}></Field><br/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="description">Description</label></td>
                            <td><Field name={'description'}></Field><br/></td>
                        </tr>
                        <tr>
                            <td>Nation</td>
                            <Field as='select' name='nation.id'>
                                {nations.map((nation,id)=> (
                                    <option key={id} value={nation.id}>
                                        {nation.name}
                                    </option>
                                ))}</Field>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button id={'btn'} type={'submit'}>Create</button>
                            </td>
                        </tr>
                    </table>
                </Form>
            </Formik>
        </>
    )
    function createCity(data) {
        axios.post("http://localhost:8080/cities", data).then(() => {
            navigate("/")
        })
    }
}