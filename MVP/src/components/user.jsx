import { useState, useEffect } from "react";

import AWS from "aws-sdk";


import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';

import Navigation from "./navigation";

import AppLayout from '@cloudscape-design/components/app-layout';
import Container from "@cloudscape-design/components/container";

import ContentLayout from "@cloudscape-design/components/content-layout";

export default function User() {

  const [users,setUsers] = useState([])


  useEffect(() => {
    
      async function listUsers(){
          try{
        
              AWS.config.update({ 
                accessKeyId: 'AKIAQSFI3SF3JUAAOS4O',
                secretAccessKey: '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',
                region: 'ap-south-1' 
                
              });
              const params = {
                UserPoolId: 'ap-south-1_3bWiWzyPK', // Replace with your Cognito User Pool ID
              };
             const cognito = new AWS.CognitoIdentityServiceProvider();
             const data = await cognito.listUsers(params).promise(); 
             if(data.Users){
                setUsers(data.Users)
             }
            
             console.log(data)
        
           
            }catch(err){
              console.log(err)
            }
           
        }
        if(users.length===0){
          listUsers()
        }
      
  
  }, [users]);



  function getName(Attributes){
    let name="";
    Attributes.forEach((item, index) => {
      if(item.Name==="name"){

        name= item.Value
      }

    });
 
    return name
  }
  
  function getEmail(Attributes){
     let name="";
    Attributes.forEach((item, index) => {
      if(item.Name==="email"){

        name= item.Value
      }

    });
 
    return name
  }

  return (
    <AppLayout
      navigation={<Navigation activeHref="/" />}
      toolsHide={true}
      navigationWidth={200}
      minContentWidth={"80%"}
      maxContentWidth={'100%'}
      content={
        <ContentLayout>
          <Container>
       
          <h2>Users</h2>
          <ThemeProvider theme={theme} colorMode="light">
            <Table highlightOnHover variation="striped" >
              <TableHead>
                <TableRow>
                  <TableCell as="th">Name </TableCell>
                  <TableCell as="th">Email</TableCell>
                  <TableCell as="th">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  
                  <TableRow>
                    <TableCell>{getName(user.Attributes)}</TableCell>
                    <TableCell>{getEmail(user.Attributes)}</TableCell>
                    <TableCell>018xxxxxxxx</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
           </ThemeProvider>
          </Container>
        </ContentLayout>
      }
    />
  );
}




const theme: Theme = {
  name: 'table-theme',
  tokens: {
    components: {
      table: {
        row: {
          hover: {
            backgroundColor: { value: '{colors.blue.20}' },
          },

          striped: {
            backgroundColor: { value: '{colors.blue.10}' },
          },
        },

        header: {
          color: { value: '{colors.blue.80}' },
          fontSize: { value: '{fontSizes.xl}' },
        },

        data: {
          fontWeight: { value: '{fontWeights.semibold}' },
        },
      },
    },
  },
};

