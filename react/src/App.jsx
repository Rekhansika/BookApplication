import React, { useEffect, useState } from 'react'
import Books from './Components/Books';


const App = () => {
  const[books,setBooks] = useState([]);
  const[filteredData,setFilteredData] = useState([]);
  
  function getData(){

    fetch("https://book-backend-krzv.onrender.com/books",{
      headers:{
        "Authorization":"whatever-you-want"
    }
    })
    .then((data)=>{
      return data.json();

    })
    .then((data)=>{
      console.log(data);
      setBooks(data);
      setFilteredData(data);
    }).catch((err)=>{
      console.log(err);
    })
    
  }

  function filterData(text){
    const inputText = text.toLowerCase().trim()
    const filteredBooksData = books.filter((ele)=>{
      const isAuthorPresent = ele.authors.some((ele)=>{
        const authorsName = ele.toLowerCase();
        return authorsName.startsWith(inputText)
      })
      const tempTile = ele.title.toLowerCase()
      return tempTile.startsWith(inputText) || isAuthorPresent;
    })
    setFilteredData(filteredBooksData)
  }
  useEffect(()=>{
    getData()
  },[])


  return (
    <div>
      <input type="text" 
      onChange={(event)=>{
        filterData(event.target.value)
      }}
      />
      <Books books={filteredData}/>
    </div>
  )
}

export default App