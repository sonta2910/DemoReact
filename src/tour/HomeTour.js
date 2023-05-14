import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomeTour() {
    const [tours, setTours] = useState([])
    let INDEX = 0

    useEffect(() => {
        axios.get('http://localhost:3000/tours').then((response) => {
            setTours([...response.data])
        })
    }, [])

    return (
        <>
            <div className={'container'}>
                <h1>List tour</h1>

                <div className={'row'}>
                    <div className={'col-8'}>
                        <Link className={'btn btn-primary'} to={'/create-tour'}>Create new tour</Link> &nbsp;
                    </div>
                </div>
                <table className={'table table-striped text-center'}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tours.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{++INDEX}</td>
                                <td>
                                    <Link to={`/detail/${item.id}`}>{item.title}</Link>
                                </td>
                                <td>{item.price}</td>
                                <td>
                                    <Link className={'btn btn-success'} to={`/update-tour/${item.id}`}>Update</Link>
                                </td>
                                <td>
                                    <Link className={'btn btn-danger'} to={`/delete-tour/${item.id}`}>Delete</Link>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )

}