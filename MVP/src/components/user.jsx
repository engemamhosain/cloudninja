import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryModel, Product as ProductModel } from "../models";
import { DataStore } from "@aws-amplify/datastore";

import { List, ListItem, Icon, } from '@aws-amplify/ui-react';

import { Auth } from 'aws-amplify';

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
import ProductMediumCollection from "./productMediumCollection";

import AppLayout from '@cloudscape-design/components/app-layout';
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Multiselect from "@cloudscape-design/components/multiselect";
import ContentLayout from "@cloudscape-design/components/content-layout";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useBreakpointValue } from "@aws-amplify/ui-react";

export default function Category() {
  // this component is used when something hits /category/{name}
  // name is used to represent the category we are viewing
  const { name } = useParams();
  const [prevName, setPrevName] = useState(""); //prevName allows us to see if the category has changed
  const [products, setProducts] = useState([]); //products is a list of the products to display filtered down
  const [allStyles, setAllStyles] = useState([]); //allStyles is a list of all the styles for building the filters
  const [filteredStyles, setFilteredStyles] = useState([]); //filteredStyles is a list of styles that are selected for filtering




// 2			
// 3		


const users = [
    { name: 'Mohammad Zaman',phone:"+1-917-648-0034",email:"mohammad.zaman@cloudcampbd.com", icon: 'fas fa-user' },
    { name: 'Md. Mahamudur Rahman Sohag',phone:"+880-1711-475-567",email:"mahamudur.rahman@cloudcampbd.com ", icon: 'fas fa-user' },
    { name: 'Emam Hosain	',phone:"+880-1750-841-137",email:"engemamhosain@gmail.com", icon: 'fas fa-user' },
    { name: 'Abdullah Al Reza',phone:"+880-1917-897-919",email:"reza.ict@gmail.com", icon: 'fas fa-user' },
    { name: 'Sanjoy K Paul	',phone:"+880-1511-927-992",email:"skpaul@DevsStation.com", icon: 'fas fa-user' },
    { name: 'Naim Hossen',phone:"+880-1750-565-053",email:"naimhossenpro@gmail.com", icon: 'fas fa-user' }
   
  ];

  useEffect(() => {
    // Query for categories to get all the styles that make up that category
    // so we can build the filter display
    async function queryCategory() {
      try {
        const categories = await DataStore.query(CategoryModel, (c) => 
          c.name.eq(name)
        );
        if (categories) {
          setAllStyles(categories[0].styles);
          return categories[0].id;
        }
      } catch (error) {
        console.log("Error retrieving category", error);
      }
    }
    
    
     async function fetchAllUsers() {
      try {
        const userList = await Auth.listUsers();
        console.log(userList)
       // setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    
   // fetchAllUsers()

  
  }, [name, filteredStyles, prevName]);

  // overrides for our collection
  // Change the style of the collection to be a list on smaller screen formats and grid
  // on larger formats. Also change the items displayed depending on the screen size
  const overrides = {
    ProductMediumCollection: {
      type: useBreakpointValue({
        small: "list",
        base: "list",
        medium: "grid",
      }),
      itemsPerPage: useBreakpointValue({
        base: "5",
        small: "5",
        medium: "10",
        large: "10",
        xl: "10",
      }),
    },
  };
  
  
  // return (
  //   <div style={styles.tableContainer}>
  //     <Table style={styles.table}>
  //       <TableHead>
  //         <TableRow>
  //           <TableCell style={styles.tableHeader}>Name</TableCell>
  //           <TableCell style={styles.tableHeader}>Age</TableCell>
  //           <TableCell style={styles.tableHeader}>Email</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {users.map((row, index) => (
  //           <TableRow key={index} style={styles.mobileView.tableRow}>
  //             <TableCell style={styles.mobileView.tableHeaderCell}>
  //               <strong>Name:</strong> {row.name}
  //             </TableCell>
  //             <TableCell style={styles.mobileView.tableCell}>
  //               <strong>Age:</strong> {row.age}
  //             </TableCell>
  //             <TableCell style={styles.mobileView.tableCell}>
  //               <strong>Email:</strong> {row.email}
  //             </TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </div>
  // );

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
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
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


// const styles = {
//   tableContainer: {
//     overflowX: 'auto',
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//   },
//   tableHeader: {
//     padding: '10px',
//     border: '1px solid #ccc',
//     textAlign: 'left',
//   },
//   tableCell: {
//     padding: '10px',
//     border: '1px solid #ccc',
//     textAlign: 'left',
//   },
//   mobileView: {
//     '@media (max-width: 768px)': {
//       tableHeader: {
//         display: 'none',
//       },
//       tableRow: {
//         display: 'block',
//         marginBottom: '20px',
//         border: '1px solid #ccc',
//       },
//       tableHeaderCell: {
//         display: 'block',
//         padding: '5px', // Adjust padding for mobile
//       },
//       tableCell: {
//         display: 'block',
//         padding: '5px', // Adjust padding for mobile
//       },
//     },
//   },
// };