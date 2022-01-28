import React, { useContext,useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { getCookie } from '../helpers/cookies';

function EditProduct() {
  let history = useHistory();
  const { authState, setAuthState } = useContext(AuthContext);
  const initialValues = {
    name: "",
    price: 0,
    stock: 0,
    description: "",
    sale: 0,
    category: 0,
  };

  useEffect(() =>{
    if(!getCookie('accessToken')){
      history.push("/login")
    }
  }, [])


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("You must input a Name!"),
    price: Yup.number().required(),
    stock: Yup.number().required(),
    description: Yup.string().required("You must input a Description!"),
    sale: Yup.number().required(),
    category: Yup.number().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/products", data, { headers: {accessToken: getCookie('accessToken')} }).then((response) => {
      history.push("/home");
    });
  };
  return <div className='createProductPage'>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form className="formContainer">
        <label>Nombre: </label>
        <Field 
          autocomplete="off"
          id="inputCreateProduct"
          name="name"
          placeholder="(Ex. Name...)"/>
        <label>Stock: </label>
        <ErrorMessage name="stock" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          name="stock"
          placeholder="(Ex. Stock...)"
        />
        <label>Price: </label>
        <ErrorMessage name="price" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          name="price"
          placeholder="(Ex. 500...)"
        />
        <label>Description: </label>
        <ErrorMessage name="description" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          name="description"
          placeholder="(Ex. 500...)"
        />
        <label>Sale: </label>
        <ErrorMessage name="sale" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          name="sale"
          placeholder="(Ex. 500...)"
        />
        <label>Categorias: </label>
        <ErrorMessage name="category" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          name="category"
          placeholder="(Ex. 5...)"
        />


        <button type="submit"> Create Post</button>
      </Form>
    </Formik>
  </div>;
}

export default EditProduct;