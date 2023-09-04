import { useState, useEffect } from "react";
import { ProductModel,EventModel} from "../models";

import { useBreakpointValue,
  ThemeProvider,
  Card,
  Grid,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
  useTheme,
  Divider,
  Collection
  
} from "@aws-amplify/ui-react";
import { Predicates, SortDirection } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { StorageImage } from '@aws-amplify/ui-react-storage';
import Navigation from "./navigation";
import AdminControls from "./adminControls";
import ProductSmallCollection from "./productSmallCollection";

import AppLayout from '@cloudscape-design/components/app-layout';
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Alert from "@cloudscape-design/components/alert";
import SpaceBetween from "@cloudscape-design/components/space-between";


export default function Recommended() {
  const [events, setEvents] = useState([]);
const [items, setItems] = useState([]);

  const { tokens } = useTheme();
  
  useEffect(() => {

    async function queryEvent() {
      
      console.log(events.length)
      if (events.length === 0) {
        try {
          const events = await DataStore.query(EventModel);
          setEvents(events);
          console.log(events)
        } catch (error) {
          console.log("Error retrieving products", error);
        }
      }
    }
    
    queryEvent();
  }, [events]);




  return (
    <AppLayout
      navigation={<Navigation activeHref="/" />}
      toolsHide={true}
      navigationWidth={200}
      minContentWidth={"80%"}
      maxContentWidth={'100%'}
      content={
    
              <Grid
                templateColumns="1fr 1fr 1fr"
                gap={tokens.space.small}>
    
                    {events.map((item,index) => (
                        <Card
                          key={index}
                          borderRadius="medium"
                          maxWidth="20rem"
                          variation="outlined"
                        >
                         <StorageImage
                            alt="fallback cat"
                                   
                            imgKey={item.image}
                            accessLevel="public"
                            fallbackSrc="/fallback_cat.jpg"
                            onStorageGetError={(error) => console.error(error)}
                          />
                          
                          <View padding="xs">
                            <Flex>
                            event date
                              <Badge
                                key={item.date}
                                backgroundColor= 'blue.40'>
                                 {item.date}
                              </Badge>
                          
                            </Flex>
                            <Divider padding="xs" />
                            <Heading padding="medium">{item.name}</Heading>
                            <Button variation="primary" isFullWidth>Join</Button>
                          </View>
                        </Card>
                      ))}
                 </Grid>
     
              }
      
            
    />
  );
}