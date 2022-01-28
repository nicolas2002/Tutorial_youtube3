import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; 
import { AuthContext } from "../helpers/AuthContext";
import { getCookie } from '../helpers/cookies';
import { useHistory } from "react-router-dom";

function Product() {
  let history = useHistory();

  let { id } = useParams();
  const [productObject, setProductObject] = useState({});
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`http://localhost:3001/products/byId/${id}`).then((response) => {
      setProductObject(response.data);
    });
  });

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3001/products/${id}`, {
        headers: { accessToken: getCookie('accessToken') },
      })
      .then(() => {
        history.push("/home");
      });
  };



  return <div>    
    <div className="postPage">
  <div className="leftSide">
    <div className="product" id="individual">
      <div className="name"> {productObject.name} </div>
      <div className="body">{productObject.stock}</div>
      <div className="footer">{productObject.description}</div>
      {!!authState.username  && (
        <button
          onClick={() => {
            deleteProduct(productObject.id);
          }}
        >
          X
        </button>
      )}
    </div>
  </div>
  <div className="rightSide">Comment Section</div>
</div></div>;
}

export default Product;
