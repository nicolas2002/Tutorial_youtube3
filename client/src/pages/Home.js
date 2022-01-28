import axios from "axios";
import React, { useContext,useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { getCookie } from "../helpers/cookies";

function Home() {

    const  [listOfProducts, setListOfProducts] = useState([]);
    const { authState, setAuthState } = useContext(AuthContext);

    let history = useHistory();
    useEffect(() =>{
      if(!getCookie('accessToken')){
        history.push("/login")
      } else {
        axios.get("http://localhost:3001/products").then((response) => {
          setListOfProducts(response.data);
        })
      }
    }, [])

  return (
  <div>
      {
        listOfProducts.map((value,key) => {
          return (
            <div className="product" onClick={() => history.push(`/product/${value.id}`)}>
              <div className="name"> {value.name} </div>
              <div className="body">{value.stock}</div>
              <div className="footer">{value.description}</div>
            </div>
          );
        })
      }
  </div>
  )
  ;
}

export default Home;
