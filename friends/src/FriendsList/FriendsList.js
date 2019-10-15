import React, { useState, useEffect } from "react";
import {NavLink} from "react-router-dom";
import { axiosWithAuth } from "../axiosWithAuth";
import AddFriends from "./AddFriends";
import "./friendslist.css";

export default function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [friend, setFriend] = useState({
    name: "",
    age: "",
    email: ""
  });

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/friends")
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("couldnt get friends");
      });
  }, []);

  const addFriend = () => {
    axiosWithAuth()
      .post("http://localhost:5000/api/friends", friend)
      .then(res => {
        console.log(res.data);
        console.log("friend added!");
        setFriends(res.data);
        setFriend({name:"",age:"",email:""});
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred!");
      });
  };

  const populateField = (friend) => {setFriend(friend);setEditMode(true)}


  const editFriend = () => {
    axiosWithAuth()
      .put(`http://localhost:5000/api/friends/${friend.id}`,friend)
      .then(res => {
        console.log(res.data);
        console.log("editied friend!");
        setFriends(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred!");
      });
  };
  const deleteFriend = id => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then(res => {
        console.log(res.data);
        console.log("deleted friend!");
        setFriends(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred!");
      });
  };

  const handleInput = e =>
    setFriend({ ...friend, ...{ [e.target.name]: e.target.value } });

const handleSubmit = e=> {
    e.preventDefault();
    // console.log("friends = ",friends);
    // console.log("friend ",friend)

    const found = friends.find(el => el.id === friend.id);
    if(found) editFriend(friend);
    else addFriend(friend.id)
}

  return (
    <div>
      <AddFriends
        friend={friend}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        editMode={Boolean(friends.find(el => el.id === friend.id))}
      />
      <table className="friendslist-table">
        <thead>
          <tr className="friendslist-table-header">
            <td>ID</td>
            <td>Name</td>
            <td>AGE</td>
            <td>EMAIL</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {friends.map(friend => {
            return (
              <tr key={friend.id} className="friendslist-table-item">
                <td>{friend.id}</td>
                <td>{friend.name}</td>
                <td>{friend.age}</td>
                <td>{friend.email}</td>
                <td>
                  <NavLink to={`friends/${friend.id}`}>view</NavLink>&nbsp;&nbsp;
                  <button style={{color:"green"}} onClick={() => populateField(friend)}>
                    Edit
                  </button>
                  <button onClick={() => deleteFriend(friend.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
