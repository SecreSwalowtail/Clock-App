import { useEffect, useState } from "react"
import Moon from '../assets/images/Moon.svg'
import parseTime from "../utils/ParseData"
import returnMiliseconds from "../utils/ParseData"

function Time(props) {
    const [time, setTime] = useState()
    const [abrev, setAbrev] = useState()
    const [country, setCountry] = useState()
    const [city, setCity] = useState()
    let miliseconds = 0


    //Fetch data each minute
    useEffect(() => {
        async function fetchTime() {
            const response = await fetch("http://worldtimeapi.org/api/ip/" + props.ip)
            const data = await response.json()
            const parse = parseTime(data.datetime)
            miliseconds = returnMiliseconds(data.datetime)
            setTime(parse)
            console.log("Current time is " + time)
            setAbrev(data.abbreviation)
        }
        fetchTime()

        // This is API costly but its easiest so ill go with this
        const interval = setInterval(() => {
            fetchTime()
        }, 60000 - miliseconds)

        // Clear the interval if the component gets unmounted
        return () => clearInterval(interval)
        
    }, [])

    //Fetch location
    //Need to find another API to get the location , this one restricts only to http
    useEffect(() => {
        async function fetchLocation() {
            const response = await fetch("http://api.positionstack.com/v1/reverse?access_key=" + "db1186c64a2efbc9a18adadd17752e18&query=" + props.ip)
            const data = await response.json()
            console.log(data)
            setCity(data.data[0].locality)
            setCountry(data.data[0].country_code)
            console.log(data)
        }
        fetchLocation()
    }, [])


    return (
        <div className="container-time">
            <div className="container-greeting">
                <img src={Moon} className="container-image"/>
                <h1 className="container-text">GOOD EVENING</h1>
            </div>
            <div className="time">
                <h1>{time}</h1>
                <p>{abrev}</p>
            </div>
            <div className="container-city">
                <p>IN {city}, {country}</p>
            </div>
        </div>
    )
}

export default Time