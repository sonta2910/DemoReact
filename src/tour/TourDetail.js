import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function TourDetail() {
    const param = useParams()
    const [tours, setTours] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3000/tours/${param.id}`).then((response) => {
            setTours(response.data)
        })
    }, [])

    return (
        <>
            <div className={'container'}>
                <h1>List tour</h1>
                <table className={'table table-striped text-center'}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                            <tr key={tours.id}>
                                <td>{tours.id}</td>
                                <td>{tours.title}</td>
                                <td>{tours.price}</td>
                                <td>{tours.description}</td>
                                <Link className={'btn btn-danger'} to={'/'}>Back</Link>
                            </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}