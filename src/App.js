import React from 'react'
import './App.css';
import {auth , db} from './firebase/init'
import { collection , addDoc ,getDocs,getDoc,doc,query,where, updateDoc, deleteDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut } from "firebase/auth";

function App() {
  const[user,setUser] = React.useState({})
  const[loading,setLoading] = React.useState(true);

  function updatePost(){
    const ID = "GdpFpbITp5fd8XSaupS7";
    const postRef = doc(db,"posts",ID);
    const newPost = {
      description: "Finish",
      uid: "21",
      title:"Land a $300k job"
    };
    updateDoc(postRef,newPost);
  }

  function Deletepost(){
    const ID = "GdpFpbITp5fd8XSaupS7";
    const postRef = doc(db,"posts",ID);
    deleteDoc(postRef);
  }
  function createPost(){
    const post = {
      title: "finsed ended firebase",
      description: " frontend simplified",
      uid: user.uid,
    };
    addDoc(collection(db,"posts"),post)
  }

  async function getAllposts(){
    const {docs} = await getDocs(collection(db,"posts"));
    const posts = docs.map((elem) => ({...elem.data(),id:elem.id}));
    console.log(posts);
  }

  async function getpostById(){
    const ID = "GdpFpbITp5fd8XSaupS7";
    const postRef = doc(db,"posts",ID);
    const postsnap = await getDoc(postRef);
    const post = postsnap.data()
    console.log(post);
  }

 async function getpostbyUid(){
    const postbyquery = await query(
      collection(db,"posts"),
      where("uid" , "==" ,user.uid),
    );
    const { docs } = await getDocs(postbyquery);
    console.log(docs.map(doc => doc.data()));
  }
  React.useEffect(() =>{
    onAuthStateChanged(auth,(user) => {
      setLoading(false);
      // console.log(user);
      if(user){
        setUser(user);
      }
    })
  },[]);

  function register(){
    console.log('register');
    createUserWithEmailAndPassword(auth, 'email@email.com','test123')
    .then((user) => {
      console.log(user);
    })
    .catch((error) =>{
      console.log(error);
    })
  }
  function login(){
    signInWithEmailAndPassword(auth, 'email@email.com','test123')
    .then(({user}) => {
      console.log(user);
      setUser(user);
    })
    .catch((error) =>{
      console.log(error.message);
    })
  }
  function logout(){
    signOut(auth)
    setUser({});
  }
  return (
    <div className="App">
    <button onClick={register}>Register</button>
    <button onClick={login}>Login</button>
    <button onClick={logout}>LogOut</button>
    {loading ? 'loading...': user.email}
    <button onClick={createPost}>Create post</button>
    <button onClick={getAllposts}>Get all post</button>
    <button onClick={getpostById}>Get Post By Id</button>
    <button onClick={getpostbyUid}>Get Post By UId</button>
    <button onClick={updatePost}>Update Post</button>
    <button onClick={Deletepost}>Delete Post</button>
    </div>
  );
}

export default App;
