import React from "react";
import ProductCard from '../../components/product_card/product_card.jsx';
// import Header from '../../components/header/header.jsx';

import './home_page.css';

const Dashboard = () => {
    return (
        <div>
            {/* <Header /> */}
            <div className="product-container">
                <ProductCard />
            </div>
        </div>
    );
}

export default Dashboard;
