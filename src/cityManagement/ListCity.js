import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function ListCity() {
    const [cities, setCities] = useState([])

    const [check, setCheck] = useState(true)
    const [test, setTest] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:8080/cities").then(response => {
            setCities(response.data)
            console.log(response.data)
            }).catch((err) => {
                console.log("Bye bye")
                console.log(err.message)
            })
        }, [check, test])

        return (
            <>
                <h1>List City</h1>
                <Link to={"/create"}>Create new city</Link>
                <table style={{border: 1}}>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Area</th>
                        <th>Population</th>
                        <th>GDP</th>
                        <th>Description</th>
                        <th>Nation</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    {cities.map((item) => {
                        return (
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                        <td>{item.area}</td>
                                    <td>{item.population}</td>
                                    <td>{item.gpd}</td>
                                    <td>{item.description}</td>
                                    <td>{item.nation?.name}</td>
                                    <td>
                                        <button onClick={() => updateCity(item.id)}>Update</button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteCity(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </table>
            </>
        )

        function createCity() {
            let city = JSON.parse(localStorage.getItem("city"))
            if (city != null) {
                cities.push(city)
                setCities([...cities])
            }
        }

        function deleteCity(index) {
            let city = getCityById(index)
            axios.delete(`http://localhost:8080/cities/${city.id}`).then(() => {
                    setTest(!test)
                }
            )
        }

        function updateCity(index) {
            let city = getCityById(index)
            setCities(city)

        }

        function update(value) {
            let city = getCityById(value.id)
            let i = cities.indexOf(city)
            cities[i] = value
            setCities([...cities])
        }

        function getCityById(id) {
            for (let i = 0; i < cities.length; i++) {
                if (cities[i].id === id) {
                    return cities[i]
                }
            }
        }
    }