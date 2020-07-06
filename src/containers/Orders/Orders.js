import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    async componentDidMount() {
        try{
            const res = await axios.get('/orders.json');
            console.log(res);
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({...res.data[key], id: key});
            }
            console.log("ORDERS",fetchedOrders);
            this.setState({loading: false, orders: fetchedOrders});

        }
        catch(ex){
            console.log(ex);
            this.setState({loading: false})
        }
        
    }   

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);