import { useState, useEffect } from "react";
import { ProductModel } from "../models";
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

import Navigation from "./navigation";
import AdminControls from "./adminControls";
import ProductSmallCollection from "./productSmallCollection";

import AppLayout from '@cloudscape-design/components/app-layout';
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Alert from "@cloudscape-design/components/alert";
import SpaceBetween from "@cloudscape-design/components/space-between";


const items = [
  {
    title: 'Milford - Room #1',
    image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badges: ['Waterfront', 'Verified'],
  },
  {
    title: 'Milford - Room #2',
    image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badges: ['Mountain', 'Verified'],
  },
   {
    title: 'Milford - Room #1',
    image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badges: ['Waterfront', 'Verified'],
  },
  {
    title: 'Milford - Room #2',
    image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badges: ['Mountain', 'Verified'],
  },
  {
    title: 'Milford - Room #1',
    image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badges: ['Waterfront', 'Verified'],
  },
  {
    title: 'Milford - Room #2',
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQASYouiqG9UqCDvH-iLdZBoPfoL8OYUug98n0l5er5&s",
    badges: ['Mountain', 'Verified'],
  },
   {
    title: 'Milford - Room #1',
    image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badges: ['Waterfront', 'Verified'],
  },
  {
    title: 'Milford - Room #2',
    image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badges: ['Mountain', 'Verified'],
  },
];






export default function Recommended() {
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState({
      type: 'success',
      message: "Success!" 
  });

  const { tokens } = useTheme();
  useEffect(() => {
    // Query prodcuts and limit to the top 5 as we need the top
    // rate products
    async function queryProduct() {
      if (products.length === 0) {
        try {
          const products = await DataStore.query(ProductModel, Predicates.ALL, {
            sort: (p) => p.rating(SortDirection.DESCENDING),
            page: 0,
            limit: 5,
          });
          setProducts(products);
        } catch (error) {
          console.log("Error retrieving products", error);
        }
      }
    }
   // queryProduct();
  }, [products]);

  useEffect(() => {
    if (showAlert) {
        const timeId = setTimeout(() => {
            setShowAlert(false);
        }, 50000);

        return () => {
            clearTimeout(timeId);
        };
    }
  }, [showAlert]);

  const alertHandler = (alertStatus) => {
    setAlertStatus(alertStatus);
    setShowAlert(true);
  };

  // override collection properties and set page size based on screen size
  const overrides = {
    ProductSmallCollection: {
      itemsPerPage: useBreakpointValue({
        base: "1",
        small: "2",
        medium: "3",
        large: "4",
        xl: "5",
      }),
    },
  };
  
  
  

  return (
    <AppLayout
      navigation={<Navigation activeHref="/" />}
      toolsHide={true}
      navigationWidth={200}
      minContentWidth={"80%"}
      maxContentWidth={'100%'}
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="Top Event"
                actions={
                  <AdminControls
                    showNewProduct={true}
                    showNewCategory={true}
                    productButtonText={"New Event"}
                    categoryButtonText={"New Type"}
                    alertHandler={alertHandler}
                    product={null}
                  />
                }
              >
                Upcomming Events 
                
              </Header>

            </SpaceBetween>
          }
        >
  <Grid
      templateColumns="1fr 1fr 1fr"
      // templateRows="20rem 20rem 20rem"
      gap={tokens.space.small}
    >
    
       {items.map((item,index) => (
       <Card
                      key={index}
                      borderRadius="medium"
                      maxWidth="20rem"
                      variation="outlined"
                    >
                      <Image
                    
                        src={item.image}
                        alt="event image"
                      />
                      <View padding="xs">
                        <Flex>
                          {item.badges.map((badge) => (
                            <Badge
                              key={badge}
                              backgroundColor={
                                badge === 'Waterfront' ? 'blue.40' 
                                : badge === 'Mountain' ? 'green.40' : 'yellow.40'}
                            >
                              {badge}
                            </Badge>
                          ))}
                        </Flex>
                        <Divider padding="xs" />
                        <Heading padding="medium">{item.title}</Heading>
                        <Button variation="primary" isFullWidth>
                          Book it
                        </Button>
                      </View>
                    </Card>
       ))}
                  
          
          </Grid>
        </ContentLayout>
      }
      
            
    />
  );
}