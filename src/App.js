import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
        products: [],
        loading: true
    }
    this.db = firebase.firestore();
}

componentDidMount() {
  // firebase
  //   .firestore()
  //   .collection('products')
  //   .get()
  //   .then((snapshot) => {
  //    const products =  snapshot.docs.map((doc) =>{
  //       const data = doc.data();
  //       data['id'] = doc.id;
  //       return data;
  //     });
  //     this.setState({
  //       products: products,
  //       loading: false
  //     })
  //   })

  this.db
    .collection('products')
    .onSnapshot((snapshot) => {
      const products =  snapshot.docs.map((doc) =>{
         const data = doc.data();
         data['id'] = doc.id;
         return data;
       })
       this.setState({
         products: products,
         loading: false
       })
     })    
}

handleIncreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //     products: products
    // })

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty + 1
      })
      .then(() => {
        console.log("Updated Successfully");
      })
      .catch((error) => {
        console.log("Error: ",error);
      })
}
 
handleDecreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);

    const docRef = this.db.collection('products').doc(products[index].id);
    const quantity = products[index].qty;
    if(quantity === 0)
    {
        return;
    }
    docRef
      .update({
        qty: products[index].qty - 1
      })
      .then(() => {
        console.log("Updated Successfully");
      })
      .catch((error) => {
        console.log("Error: ",error);
      })

    
    // products[index].qty -= 1;

    // this.setState({
    //     products: products
    // })
}

handleDeleteProduct = (id) => {
    const {products} = this.state;
    // const items = products.filter((item) => item.id!==id);

    // this.setState({
    //     products: items
    // })

    const docRef = this.db.collection('products').doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("Deleted Successfully");
      })
      .catch((error) => {
        console.log("Error: ",error);
      })

};

getCartCount = () =>{
  const {products} = this.state;
  let count = 0;

  products.forEach((product) =>{
    count += product.qty;
  })

  return count;
}

getCartTotal = () =>{
  const {products} = this.state;
  let cartTotal = 0;

  products.forEach((product) =>{
    cartTotal += product.qty*product.price;
  })

  return cartTotal;
}

addProduct = () => {
  this.db
    .collection('products')
    .add({
      img: 'https://5.imimg.com/data5/CW/VP/MY-37028020/25-kg-industrial-washing-machine-500x500.jpg',
      price: 19999,
      qty: 3,
      title: "Washing Machine"
    })
    .then((docRef) =>{

    })
    .catch((error) =>{

    })
}

  render() {
    const {products,loading} = this.state;
    return (
      <div className="App">
        <Navbar 
        count = {this.getCartCount()}
        />
        <button style = {{ padding: 20, fontSize: 20 }} onClick = {this.addProduct}>Add a Product</button>
        <Cart
        products = {products} 
        onIncreaseQuantity = {this.handleIncreaseQuantity}
        onDecreaseQuantity = {this.handleDecreaseQuantity}
        onDeleteProduct = {this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products</h1>}
        <div style = {{padding: 10, fontSize: 20}}>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}


export default App;
