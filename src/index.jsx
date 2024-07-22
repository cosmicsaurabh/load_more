import { useEffect, useState } from "react";
import "./styles.css";

export default function Loadmore() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);

    async function fetchProducts() {
        try {
            setLoading(true);
            const response = await fetch(
                `https://dummyjson.com/products?limit=20&skip=${count}`
            );
            const result = await response.json();

            if (result && result.products && result.products.length) {
                setProducts((prevData) => [...prevData, ...result.products]);
                setLoading(false);
            }
            
            console.log(result);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }
    useEffect(() => {
        // Initial fetch with skip=0
        fetchProducts(0);
    }, []);

    useEffect(() => {
        if(count>0) fetchProducts();
    }, [count]);

    useEffect(() => {
        if (products && products.length === 100) setDisableButton(true);
    }, [products]);

    if (loading) return <div>loading.........sfgawgaw</div>;

    return (
        <div className="loadmore-container">
            <div className="product-container">
                {products && products.length
                    ? products.map((item) => (
                        <div className="product" key={item.id}>
                            <img src={item.thumbnail} alt={item.title} />
                            <p>{item.title}</p>
                        </div>
                    ))
                    : null}
            </div>
            <div className="button-container">
                <button
                    disabled={disableButton}
                    onClick={() => setCount(count + 20)}
                >
                    Load More
                </button>
                {disableButton ? <p>You have reached max product limit of 100...</p> : null}
            </div>
        </div>
    );
}
