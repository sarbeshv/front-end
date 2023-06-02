import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

export default function Learn() {

 const [line, setLine] = useState("sarbesh");

const OnChange=()=>{
   setLine("Anish");
   console.log(line);
};
  return (
    <div>
      dskjfksfklsjk
       <div>{line}</div>
       <Button onClick={OnChange}>Submit</Button>
    </div>
   
  )
}
