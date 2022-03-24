import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function RowDetails({label, image}) {
 
  return (
    <tr>
    <th>{label}</th>
    <td>{image}</td>
  
    
  </tr>
  )
}

export default RowDetails