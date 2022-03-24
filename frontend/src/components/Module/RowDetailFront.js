
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button,  CardActionArea, CardActions } from '@mui/material';
import DayJS from 'react-dayjs';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

function RowDetailsFront({label, description , date_creation , Id }) {
  var connectedUser = useSelector(selectConnectedUser)
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
       
        <Button size="small" color="primary" >
        <Link to={`addUser/${Id}/${connectedUser.email}`} className=" p-2" >Rejoindre  </Link>
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
     
   
        <p class="card-footer">
        <button type="button" className="btn btn-primary  btn-sm btn-block" onClick={() => history.push("/signin")}> rejoindre </button>
   </p>
    </div>
    
 </div>
 <div class="container">
   <br/>
   </div>
 </div>*/
 
  )
}

export default RowDetailsFront