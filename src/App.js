
import './App.css';
import {useState, useEffect} from "react";


function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [usersList, setUsersList] = useState([]);
 

  const addUser = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
const settings = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-TYPE": "application/json",
  },
  body: JSON.stringify(data),
};

try {
  const res = await fetch("https://tutorial-backend-test.herokuapp.com/users", settings);
  if(res.ok) {
    return res.json();
  }
} catch (error) {
     console.log(error);
}

  };


  const getUsers = async () => {
    try {
      const res = await fetch("https://tutorial-backend-test.herokuapp.com/users");
      const data = await res.json();
      if(res.ok) {
        setUsersList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

useEffect(()=> {
  getUsers();
}, [usersList]);

  return (
    <div className="App">
     <div>

       <label htmlFor="">First Name</label>
       <input type = "text" onChange = {(e) => {
         setFirstName(e.target.value);
       }} />

       <label htmlFor= "">Last Name</label>
       <input type = "text" onChange = {(e) => {
         setLastName(e.target.value);
       }} />

       <label htmlFor= "">Age</label>
       <input type = "text" onChange = {(e) => {
         setAge(e.target.value);
       }} />

       <button onClick = {addUser}>Submit</button>

<div className = "listUsers">

{usersList.map((user) => {
  return (
  <div key ={user.id}>
        <h3>{user.firstName}</h3>
        </div>
  )
} )}


</div>
       
   
     </div>
    </div>
  );
}

export default App;
