import React from 'react';

const CartItem = (props) => {
    const {price,title,qty,img} = props.product;
    const {product, onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct} = props;
    return (
        <div className = "cart-item">
            <div className = "left-block">
                <img alt="Item" style = {styles.image} src={img}/>
            </div>
            <div className = "right-block">
                <div style= {{fontSize: 25}}>{title}</div>
                <div style= {{color: '#777'}}>Rs.{price}</div>
                <div style= {{color: '#777'}}>Qty: {qty}</div>
                <div className = "cart-item-actions">
                    {/* Cart Item Button Actions */}
                    <img 
                    alt="increase" 
                    className = "action-icons" 
                    src="https://image.flaticon.com/icons/svg/1828/1828919.svg"
                    onClick = {() => onIncreaseQuantity(product)}
                    />
                    <img 
                    alt="decrease" 
                    className = "action-icons" 
                    src="https://image.flaticon.com/icons/svg/1828/1828899.svg"
                    onClick = {() => onDecreaseQuantity(product)}
                    />
                    <img 
                    alt="delete" 
                    className = "action-icons" 
                    src="https://image.flaticon.com/icons/svg/447/447002.svg"
                    onClick = {() => onDeleteProduct(product.id)}
                    />
                </div>
            </div>
        </div>
    );
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;



    // increaseQuantity = () => {
    //     // State form 1
    //     // this.setState({
    //     //     title: "Mobile Phones"
    //     // });

    //     // State form 2 if change from previous state
    //     this.setState((prevState) => {
    //         return {
    //             qty: prevState.qty + 1
    //         }
    //     });
    // }

    // decreaseQuantity = () => {

    //     const {qty} = this.state;
    //     if(qty === 0){
    //         return;
    //     }
    //     // State form 2 if change from previous state
    //     this.setState((prevState) => {
    //         return {
    //             qty: prevState.qty - 1
    //         }
    //     });
    // }