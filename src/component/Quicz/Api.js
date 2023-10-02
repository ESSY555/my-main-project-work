import React, { useEffect, useState } from 'react'
import { masterDef } from './jsonresult';

function Api() {
    const [data, setdata] =useState(masterDef)

    useEffect(()=>{
      fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
       .then((result) =>{
         console.log(result);
         setdata(result)
       });
    },[])
     
     

  return (
    <div>

    
      
    {
      data.text()
    }
    
    </div>
  );
  }


export default Api;
