
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {onSnapshot} from "firebase/firestore";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import React from 'react';


const HatsPage=()=>(
  <div>
    <h1>this is the hats page</h1>
  </div>
);

class App extends React.Component {
  constructor(){
    super();
    this.state={
      currentUser:null
    }
  }

unsubscribeFromAuth=null;

componentDidMount() { 

  this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
   
    if(userAuth){
      const userRef= await createUserProfileDocument(userAuth);
      
      onSnapshot(userRef,snapshot=>{
        this.setState({
          currentUser:{
            id:snapshot.id,
            ...snapshot.data()
          }
        });
        
       
      });

     
    
    }
      this.setState({currentUser:userAuth});
      
    
  
   
    
  console.log(this.state)
    

  })
 
 }

 componentWillUnmount() {
   this.unsubscribeFromAuth();
  }

 



  render(){
    return (
    
      <div>
       <Header currentUser={this.state.currentUser}/>
      <Routes>
         <Route path='/' element={<HomePage/>} />
         <Route path='/hats' element={<HatsPage/>} />
         <Route path='/shop' element={<ShopPage/>} />
         <Route path='/signin' element={<SignInAndSignUpPage/>} />
       </Routes>
       
      </div>
     
     );
  }
 
}

export default App;
