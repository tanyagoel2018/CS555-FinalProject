import React, {useState, useEffect} from "react";
import { animationData } from "../data/animationData";
import { Card, CardMedia, Stack, Paper } from "@mui/material";

const Animation = (props)=>{
    const [gify,setGify] = useState(props.gif);     
    const [localGif, setLocalGif] = useState(props.gif);
    const [animations, setAnimations] = useState(animationData);
    const handleSaveOutfit =async ()=>{
        console.log("inside save handle");
        setGify("https://drive.google.com/uc?export=download&id=1xHY9h6o7P4UbIk22R7wQJpVTocPzOtnD");
        setLocalGif("https://drive.google.com/uc?export=download&id=1xHY9h6o7P4UbIk22R7wQJpVTocPzOtnD")
    };
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setGify(localGif);
            // setGify("https://drive.google.com/uc?export=download&id=1xHY9h6o7P4UbIk22R7wQJpVTocPzOtnD");
        }, 3000)
        return ()=>{
          clearTimeout(timer);
        }
    }, [gify]);

    return (
        <>
         <Card sx={{ width: "30em", height: "25em" , boxShadow: "none"}}>
            <CardMedia
            component="img"
            image={gify}
            height={"500em"}
            alt="green iguana"
            />
         </Card>
            <Stack direction="row" marginBlock={10}>            
                {animations.map((animation) => {
                const { gif, buttonName } = animation;
                return <AnimationButton gify={gif} buttonName={buttonName} setGify= {setGify} />;
                })}
            </Stack>
            <Paper
              elevation={10}
              sx={{
              bgcolor: "#54ff76",
              width: "5em",
              height: "3em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "20px",
              cursor: "pointer",
              }}
              onClick={handleSaveOutfit}
            >
            save outfit
        </Paper>
        </>
       
    );
}

const AnimationButton = ({buttonName, gify, setGify})=>{
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
                setGify(gify)
            }}
            >
            {buttonName}
        </Paper>
    );

}  

export default Animation;