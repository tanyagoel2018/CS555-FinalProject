import React, {useState, useEffect} from "react";
import { animationData } from "../data/animationData";
import { Card, CardMedia, Stack, Paper } from "@mui/material";

const Animation = (props)=>{
    // const [gify,setGify] = useState(props.gif);     
    // const [localGif, setLocalGif] = useState(props.gif);
    
    // const handleSaveOutfit =async ()=>{
    //     console.log("inside save handle");
    //     props.updateGif("https://drive.google.com/uc?export=download&id=1xHY9h6o7P4UbIk22R7wQJpVTocPzOtnD");

    //     setGify("https://drive.google.com/uc?export=download&id=1xHY9h6o7P4UbIk22R7wQJpVTocPzOtnD");
    //     setLocalGif("https://drive.google.com/uc?export=download&id=1xHY9h6o7P4UbIk22R7wQJpVTocPzOtnD")
    // };
    
    const {gif, updateGif} = props;

    const handleChangeAnimation = (img)=>{
        updateGif(img);

        setTimeout(()=>{
           updateGif(gif);
        }, 3000)
    }


    const [animations, setAnimations] = useState(animationData);
    return (
        <>
         <Card sx={{ width: "30em", height: "25em" , boxShadow: "none"}}>
            <CardMedia
            component="img"
            image={gif}
            height={"500em"}
            alt="green iguana"
            />
         </Card>
            <Stack direction="row" marginBlock={10}>            
                {animations.map((animation) => {
                const { gif, buttonName } = animation;
                return <AnimationButton gify={gif} buttonName={buttonName} handleChangeAnimation= {handleChangeAnimation} />;
                })}
            </Stack>
        </>
       
    );
}

const AnimationButton = ({buttonName, gify, handleChangeAnimation})=>{
    return (    
        <Paper
            elevation={10}
            sx={{
            bgcolor: "#EEAC02",
            width: "5em",
            height: "3em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "20px",
            cursor: "pointer",
            }}
            onClick={()=>{
                handleChangeAnimation(gify)
            }}
            >
            {buttonName}
        </Paper>
    );

}  

export default Animation;