const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const awsmobile = require('./aws-exports.js');

const SOURCE_BUCKET_URL = 'https://retail-demo-store-us-east-1.s3.amazonaws.com';

const yaml = require('js-yaml');
const fs = require('fs');

const CATEGORY_DATA = './data/categories.yaml';
const PRODUCT_DATA = './data/products.yaml';
const USER_DATA = './data/users.yaml';

const APPSYNC_API_ENDPOINT_URL = awsmobile.aws_appsync_graphqlEndpoint;
const APPSYNC_API_KEY = awsmobile.aws_appsync_apiKey;

const REVIEWS = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const appsyncClient = () => {
  if (!APPSYNC_API_ENDPOINT_URL) throw Error('Invalid API Endpoint');
  return axios.create({
    baseURL: APPSYNC_API_ENDPOINT_URL,
    headers: { 'x-api-key': APPSYNC_API_KEY },
  });
};


// const createUser = /* GraphQL */ `
//   mutation CreateUser(
//     $input: CreateUserInput!
//     $condition: ModelUserConditionInput
//   ) {
//     createUser(input: $input, condition: $condition) {
//       id
//       name
//       phone
//       email
//       address
//       createdAt
//       updatedAt
//       __typename
//     }
//   }

// `;


const createUser = (user) => {
  return `
    mutation Mutation {
      createUser(input: { id: "${user.id}", name: "${user.name}",phone:"${user.phone}",,email:"${user.email}",address:"${user.address}"}) {id}
    }`;
};


const categoryMutation = (cat) => {
  return `
    mutation Mutation {
      createCategory(input: {description: "te", id: "101", name: "sdfsf"}) {id}
    }`;
};

 const createTodo =()=>{
 
 return ` mutation Mutation {
 createMy(input: {id: "9", description: "tt", name: "tt"}) {
    id
  }
}
`
}
;
 
const productMutation = (prod) => {
  return `
    mutation Mutation {
      createProduct(input: {
        categoryID: "${prod.categoryId}", 
        current_stock: ${prod.current_stock}, 
        description: "${prod.description}", 
        image: "${prod.image}", 
        name: "${prod.name}", 
        price: ${prod.price}, 
        rating: ${REVIEWS[Math.floor(Math.random() * REVIEWS.length)]}, 
        style: "${prod.style}"
      }) {
        _deleted
        _lastChangedAt
        _version
        categoryID
        createdAt
        current_stock
        description
        id
        image
        name
        price
        rating
        style
        updatedAt
      }
    }`;
};

const loadData = async () => {
  console.log('---- BEGINNING DATA LOAD ----');

  // Load the Categories


  const userData = yaml.load(fs.readFileSync(USER_DATA, 'utf8'));
  const categoryData = yaml.load(fs.readFileSync(CATEGORY_DATA, 'utf8'));


 
  
  
  const categories = {};
  categoryData.forEach((cat) => {
    categories[cat.name] = {
      "id": uuidv4(),
      "name": cat.name,
      "description": cat.description,
      "image": `${SOURCE_BUCKET_URL}/images/${cat.name.toLowerCase()}/${cat.image}`,
      "styles": []
    }
  });
  console.log(`Product Categories Found: ${Object.keys(categories).length}`);

  // Load the Products
  const productData = yaml.load(fs.readFileSync(PRODUCT_DATA, 'utf8'));

  const products = [];
  productData.forEach((prod) => {
    products.push({
      "id": prod.id,
      "categoryId": categories[prod.category].id,
      "current_stock": prod.current_stock,
      "description": prod.description,
      "image": `${SOURCE_BUCKET_URL}/images/${prod.category.toLowerCase()}/${prod.image}`,
      "name": prod.name,
      "price": prod.price,
      "style": prod.style
    });
    
    // Update available styles for product category
    if (!categories[prod.category].styles.includes(prod.style)) {
      categories[prod.category].styles.push(prod.style);
    }
  });
  console.log(`Products Found: ${products.length}`);

  const appsync = appsyncClient();

  // Load the users
  let cnt = 0;

    
    
 
    for (let key in userData) {
      const { status,error } = await appsync.post('', {
        query: createUser(userData[key]),
      });
      console.log(status,error)
      console.log(createUser(userData[key]))
      
    }

  
  return
    

  
  console.log('');
  console.log(
    `Category Import Completed ---- ${
      cnt > 0 ? `${cnt} records failed` : 'no errors'
    }`
  );

  for (let key in categories) {
    console.log(categoryMutation(categories[key]))
    const { status } = await appsync.post('', {
      query: categoryMutation(categories[key]),
    });
    console.log(status)
    if (status !== 200) {
      process.stdout.write('x');
      cnt += 1;
    } else process.stdout.write('.');
  }
  console.log('');
  console.log(
    `Category Import Completed ---- ${
      cnt > 0 ? `${cnt} records failed` : 'no errors'
    }`
  );
  
  return

  // Load the products
  cnt = 0;
  console.log('Beginning Product Import ----');
  for (let prod of products) {
    const { status } = await appsync.post('', { query: productMutation(prod) });
    if (status !== 200) {
      process.stdout.write('x');
      cnt += 1;
    } else process.stdout.write('.');
  }
  console.log('');
  console.log(
    `Product Import Completed ---- ${
      cnt > 0 ? `${cnt} records failed` : 'no errors'
    }`
  );

  console.log('---- DATA LOAD COMPLETE ----');
};

loadData();
