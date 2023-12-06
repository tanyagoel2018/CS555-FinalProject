import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from "@mui/material/Fade";
import Backdrop from '@mui/material/Backdrop';
import { CardMedia, Paper, Card, CardContent, Button } from '@mui/material';
import { Stack } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { useApi } from "../ContextAPI/APIContext";
import { useState } from 'react';
import useSnackbar from "../hooks/useSnackbar";
import BackDrop from '../components/Backdrop';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f4f2f7',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const  OutFits=({open, handleClose, gif, productOwned, reloadParent, reload})=> {
  const {restAPI} = useApi();
  const [outFits, setOutFits] = useState(productOwned)
  const [localGif, setLocalGif] = useState(gif);
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  React.useEffect(()=>{
    setOutFits(productOwned);
  },[productOwned])
  
  const handleSaveOutFit = async()=>{
    try {
      setLoader(true);
      let response = await restAPI.post("/protected/products/myProducts", {img: localGif});
      snackbar.showSuccess("Outfit Saved");
      reloadParent(reload+1);
      const of = outFits.map((outfit)=>{
        if(outfit.selected){
          outfit.selected= false;
        }
        if(outfit.animation === localGif){
          outfit.selected = true;
        }
        return outfit
      })
      setOutFits(of)
      
    } catch (error) {
      if (error.response.status === 403){
        localStorage.removeItem("Are_you_in");
        navigate("/");
      }
      snackbar.showError("Outfit could not be saved");
    }
    setLoader(false);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
            <Box sx= {style}>
              <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{marginLeft: "-20px", marginTop:"-30px"}}>
                <RxCross1 color='red'/>
              </IconButton>
                <Stack>
                <Box display="flex" justifyContent="center" alignItems="center" paddingBottom={3}>

                  <Card sx={{ width: "20em", height: "17em" , boxShadow: "10 10 10 10 " , border: "1px solid" }}>
                      <CardMedia
                      component="img"
                      image={localGif}
                      alt="green iguana"
                      />
                  </Card>  
                </Box>
                <Box paddingBottom={2}> 
                  <Divider/> 
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" paddingBottom={1}>
                  <Typography variant='h5'>Outfits</Typography>
                </Box>
                
                <Box sx={{ overflow: 'auto', maxHeight: '150px' }}>
                {outFits && 
                <Grid container spacing={2}>
                  {outFits.map((product) => {
                      const {animation,selected }  = product
                      return <MyProducts animation= {animation} selected={selected}  setLocalGif = {setLocalGif} outFits = {outFits} setOutFits = {setOutFits}/>
                    })}
                </Grid>}
                </Box>
                <Box  display="flex" justifyContent="center" alignItems="center" paddingTop={3}>
                  {loader && <BackDrop loader={loader}/>} 
                  {!loader && 
                  <Button onClick= {handleSaveOutFit} disabled= {gif === localGif}>
                  <Paper
                      elevation={10}
                      sx={{
                      bgcolor: gif===localGif? "gray": "green",
                      width: "5em",
                      height: "3em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "20px",
                      cursor: "pointer",
                      }}     
                      > 
                        save
                    </Paper>
                  </Button>}
                </Box>
              </Stack> 
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const MyProducts = ({animation, selected, setLocalGif, outFits,setOutFits })=>{
    let color = selected?"green":"grey";
    let cardContent =selected?"Selected": "Not Selected";
    const handleClick = ()=>{
      setLocalGif(animation);
      const of = outFits.map((outfit)=>{
        if(outfit.selected){
          outfit.selected= false;
        }
        if(outfit.animation === animation){
          outfit.selected = true;
        }
        return outfit
      })
      setOutFits(of)
    }
        return (
          <Grid item xs={6} >
          <Card sx={{ maxWidth: 345}} >
            <CardMedia
                component="img"
                height="100"
                image= {animation}
                alt="green iguana"
                onClick={handleClick}
            />
            <CardContent sx={{backgroundColor:color, margin: "-15px"}} onClick={handleClick} >
                <Typography variant='body1' paddingLeft={2} paddingTop={1}>{cardContent}</Typography>
              </CardContent>
              
          </Card>
        </Grid>
        );
  
  }

export default OutFits;
