import React,{useState,useEffect} from 'react';
import {axiosWithAuth} from "../axiosWithAuth";



export default function Friend(props) {

    const [friend, setFriend] = useState({name:"",age:"",email:""})

    useEffect(()=>{
        axiosWithAuth().get(`http://localhost:5000/api/friends/${props.match.params.id}`)
        .then(res =>{
            setFriend(res.data)
        })
        .catch(err =>{

        })
    },[props.match.params.id])

    
    return <div className="friend-container">
        
        <div>
            <p>Name: {friend.name}</p>
            <p>Age: {friend.age}</p>
            <p>Email: {friend.email}</p>
        </div>
    </div>
}