import React, { useState, useEffect } from "react";
import axios from "axios";






function App() {
  const [term, setTerm] = useState("");
  const [pictures, setPictures] = useState([]);
  const [pageNum, setPagenum] = useState(1);
  const [isloading, setIsloading] = useState(false);

  const changeHandler = e => {
    setTerm(e.target.value);
    console.log(term);
  };

  const pageChange = e => {
    e.preventDefault();
    e.target.name === "inc"
      ? setPagenum(pageNum + 1)
      : e.target.name === "dec" &&
        pageNum > 1 &&
        /*  the next line is a ternary condition */ setPagenum(
          pageNum - 1
        );
    setIsloading(true);
    console.log("pageNum: ", pageNum);
  };

  useEffect(() => {
     isloading && 
      axios
        .get("https://api.unsplash.com/search/photos", {
          params: {
            query: term,
            page: pageNum,
            per_page: 28
          },
          headers: {
            Authorization:
              "Client-ID 89a74f8c26da940b295f7c22ccaf83e3404ac033065c8db15fcbbc3b0639a400"
          }
        })
        .then(response => {
          setPictures([...response.data.results]);
          setIsloading(false);
          
        })
        .catch(error => {
          console.log(error.message);
        });
  });

  const sendRequest = e => {

    e.preventDefault();
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: {
          query: term,
          per_page: 24
        },
        headers: {
          Authorization:
            "Client-ID 89a74f8c26da940b295f7c22ccaf83e3404ac033065c8db15fcbbc3b0639a400"
        }
      })
      .then(response => {
        setPictures([...response.data.results]);
      
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div className="App container mt-5  " >
      <h1 className="text-center text-white bg-secondary rounded-pill">PHOTO GALLERY  </h1>
      
      <header className="App-header bg-secondary p-3 rounded-pill">
        <form onSubmit={sendRequest} className="form-row">
      <div className="col">
            {" "}
            <input
              type="text"
              onChange={changeHandler}
              className="form-control rounded-pill"
              placeholder="Type your choice ..."
            />
          </div>
          <div className="col-3">
            <input
              type="submit"
              value="Search"
              className="btn btn-success form-control rounded-pill"
              
            />
          </div>
        </form>
      </header>
      <div className="container">
        <div className="d-flex flex-wrap bg-secondary">
          {pictures.length
            ? pictures.map(pic => (

        <div  key={pic.id}>
          <a href={pic.urls.full} target="blank">
              {" "}
          <img
        src={pic.urls.thumb}
        style={{ width: "101px", height: "101px"}}
        className="rounded-circle mr-5 mb-2 "
        alt={pic.id}
          />
        </a>
        </div> 
            ))
            : null}
        </div>
        <div className="d-flex justify-content-between ">
          <button
            type="button"
            onClick={pageChange}
            name="dec"
            className="form-control col-3 bg-success rounded-pill text-white"
          >
            {"<<<="}
          </button>
          <button
            type="button"
            onClick={pageChange}
            name="inc"
            className="form-control col-3 bg-success rounded-pill text-white"
          >
            {"=>>>"}
          </button>
        </div>
        
      </div>
         
    </div>
    
  );
}

export default App; 
