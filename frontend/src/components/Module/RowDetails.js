
import React from 'react'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DayJS from 'react-dayjs';
import { Button, CardActionArea, CardActions } from '@mui/material';
function RowDetails({ label, description, date_creation, Id, OnDelete }) {

  return (

<div class="col-sm-3 mb-3  p-2" >
 <Card sx={{ maxWidth: 345 }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://www.w3.org/html/logo/downloads/HTML5_sticker.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {description}
           </Typography>
           <Typography variant="body2" color="text.secondary">
           <DayJS element="span" asString={ true }>
          {date_creation}
          </DayJS>
           </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Button  size="small" color="error"  onClick={() => OnDelete(Id)} >
         Delete
        </Button >

        <Button size="small" color="primary" >
        <Link to={`module/${Id}`} className=" p-2" >Update  </Link>
        </Button>
      </CardActions>
    </Card>
    
</div>




/*
    <div class="col-sm-3 mb-3  p-2" >

      <div class="card ">
        <div class="card-header"> {label} </div>
        <div class="card-body">
          <img src="https://www.w3.org/html/logo/downloads/HTML5_sticker.png" class="card-img-top" alt="Accroche HTML" />
          <p class="card-title">{description} </p>
          <p class="card-text">{date_creation} </p>
          <p class="card-text ">
            <button className="badge btn btn-danger p-2" onClick={() => OnDelete(Id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-x-fill" viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.854 7.146 8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 1 1 .708-.708z" />
              </svg> Delete </button>
            <span>   </span>
            <Link to={`module/${Id}`} className="badge bg-success p-2" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-x-fill" viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.854 7.146 8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 1 1 .708-.708z" />
              </svg>
              Update </Link>  </p>

        </div>

      </div>
      <div class="container">
        <br />
      </div>
    </div>
    */

  )
}

export default RowDetails