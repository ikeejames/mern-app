import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);


  const BACKEND_URL = 'https://mern-backend-tzif.onrender.com'

  const addFriend = () => {
    Axios
      .post(`${BACKEND_URL}/friends/create`, { name, age })
      .then((res) => {
        setListOfFriends([...listOfFriends, { _id: res.data.status._id, name, age }]);
      }).catch(err => console.log(err))
  }

  const updateFriend = (_id) => {
    const newAge = prompt("Enter new Age:");
    const obj = {
      age: newAge
    }

    Axios
      .put(`${BACKEND_URL}/friends/update`, { _id, obj })
      .then(() => {
        setListOfFriends(listOfFriends.map(val => {
          return val._id === _id
            ? { _id: val._id, name: val.name, age: newAge }
            : val;
        }));
      });
  }

  const deleteFriend = (_id) => {
    const text = "are you sure you want to delete?";
    if (window.confirm(text)) {
      Axios
        .delete(`${BACKEND_URL}/friends/remove`, { data: { _id } })
        .then(() => {
          setListOfFriends(listOfFriends.filter(val => {
            return val._id !== _id;
          }));
        })
        .catch(err => console.log(err));
    } else {
      console.log(false);
    }
  }

  useEffect(() => {
    Axios.post(`${BACKEND_URL}/friends/retrieve`)
      .then((res) => setListOfFriends(res.data))
      .catch(() => console.log('error'));
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input type="text" placeholder='Friend Name' onChange={(event) => setName(event.target.value)} />
        <input type="number" placeholder='Friend Age' onChange={(event) => setAge(event.target.value)} />

        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className='friendLists'>
        {listOfFriends.map(val => {
          return (
            <div className='friends-box'>
              <div className='friends-details' key={val._id}>
                <h3>Name: {val.name}</h3>
                <p>Age: {val.age}</p>
                <p>Description: {val.description}</p>
              </div>
              <div className='btns'>
                <button onClick={() => { updateFriend(val._id) }}>Update</button>
                <button onClick={() => { deleteFriend(val._id) }}>X</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
