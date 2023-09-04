import { useState, useEffect } from "react";
import { ProductModel,EventModel } from "../models";
import { 
TextField,
  Button,
  Card
  
} from "@aws-amplify/ui-react";


import {  Storage } from 'aws-amplify';
import { useNavigate } from "react-router-dom";


import { DataStore } from "@aws-amplify/datastore";

import Navigation from "./navigation";

import AppLayout from '@cloudscape-design/components/app-layout';


export default function AddNewEvent() {
   let navigate = useNavigate();
  const [eventName,setEventName] = useState([]);
  const [imageName,setImageName] = useState([]);
  
  const [eventMessage,setEventMessage] = useState([]);
  const [eventDate,setEventDate] = useState([]);
  

 
  
  
async function addNewEvent(){
      await DataStore.save(
        new EventModel({
    		"name": eventName,
    		"message": eventMessage,
    		"date":eventDate ,
    		"image":imageName
      	})
      );
  navigate('/event');
}

async function onChange(e) {
 
 
  try {
     const file = e.target.files[0];
   let imageName=new Date().getTime()+file.name;
    setImageName(imageName)
    await Storage.put(imageName, file, {
      //contentType: "image/png", // contentType is optional
    });
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
}


  return (
    <AppLayout
      navigation={<Navigation activeHref="/" />}
      toolsHide={true}
      navigationWidth={200}
      minContentWidth={"80%"}
      maxContentWidth={'100%'}
      content={
      
         <Card variation="elevated">
        
            <h2>Add New Event</h2>
            <TextField onChange={(e) => setEventName(e.target.value)} label="Event name" type="text" isRequired={true} />
            <TextField onChange={(e) => setEventMessage(e.target.value)} label="message" type="text" isRequired={true} />
            <TextField  inputProps={{ accept: 'image/*' }} label="Event image"  onChange={onChange} type="file" isRequired={true} />
            <TextField onChange={(e) => setEventDate(e.target.value)} label="Event date" type="date" isRequired={true} />
            <br/>
            <Button isFullWidth ={true} onClick={addNewEvent} variation="primary">Add</Button>
         </Card>
      }
    />
  );
}



