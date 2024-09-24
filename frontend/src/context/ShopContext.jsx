import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currency = '₹';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartitems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select size');
            return;
        }
        let cartData = structuredClone(cartitems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] = cartData[itemId][size] + 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartitems) {
            for (const item in cartitems[items])
                try {
                    if (cartitems[items][item] > 0) {
                        totalCount += cartitems[items][item];
                    }
                } catch (error) { }
        }
        return totalCount;
    }

    const updateQuantiy = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartitems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let amount = 0;
        for (const items in cartitems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartitems[items]) {
                try {
                    if (cartitems[items][item] > 0) {
                        amount += cartitems[items][item] * itemInfo.price;
                    }
                } catch (error) { }
            }
        }
        return amount;
    }


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getUserCart = async (token) => {
        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    useEffect(() => {
        getProductsData();
    }, [products]);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, [])

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart, getCartCount, updateQuantiy, getCartAmount, navigate, backendUrl, token, setToken, cartitems, setCartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
};

export default ShopContextProvider;