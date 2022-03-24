
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DayJS from 'react-dayjs';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import UpdateModule from '../../components/Module/UpdateModule'

function RowDetails({ label, description, date_creation, Id, OnDelete ,OnAdd}) {
  var connectedUser = useSelector(selectConnectedUser)
  const [update, setUpdate] = useState(false);
  return  update==false?(

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
        
        <Button size="small" color="primary" onClick={() => setUpdate(!update)} >
        Update  
        </Button>
        
        
      </CardActions>
    </Card>
    
</div>

  ):(
    <UpdateModule idU={Id}></UpdateModule>
  )
}

export default RowDetails