import React from "react";

export default function AddFriends({handleSubmit,handleInput,friend,editMode}) {
  return (
    <form className="addfriends-form" onSubmit={handleSubmit}>
      <h4 style={{ color: "#f4811f" }}>ADD FRIENDS</h4>
      <div className="addfriends">
      <div>
        <input
          required
          name="name"
          placeholder="Name"
          value={friend.name}
          onChange={handleInput}
          className="lg-form-input"
        />
      </div>
      <div>
        <input
          required
          name="age"
          value={friend.age}
          type="number"
          placeholder="age"
          onChange={handleInput}
          className="lg-form-input"
        />
      </div>
      <div>
        <input
          required
          name="email"
          value={friend.email}
          type="email"
          placeholder="Email"
          onChange={handleInput}
          className="lg-form-input"
        />
      </div>
      <div>
        <button type="submit" className="lg-form-button">
         {editMode ? "EDIT": "ADD"}
        </button>
      </div>
      </div>
    </form>
  );
}
