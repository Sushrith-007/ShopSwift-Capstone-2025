import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  cartItems: [],
  cartCount: 0,
  wishlistItems: [],
  wishlistCount: 0,
  loading: true
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  SET_WISHLIST_ITEMS: 'SET_WISHLIST_ITEMS'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false
      };
    
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        cartItems: [],
        cartCount: 0,
        wishlistItems: [],
        wishlistCount: 0
      };
    
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case ActionTypes.SET_CART_ITEMS:
      const cartCount = action.payload.reduce((total, item) => total + item.quantity, 0);
      return {
        ...state,
        cartItems: action.payload,
        cartCount
      };
    
    case ActionTypes.ADD_TO_CART:
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      let updatedCartItems;
      
      if (existingItemIndex >= 0) {
        updatedCartItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
      
      const newCartCount = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
      
      return {
        ...state,
        cartItems: updatedCartItems,
        cartCount: newCartCount
      };
    
    case ActionTypes.REMOVE_FROM_CART:
      const filteredCartItems = state.cartItems.filter(item => item.id !== action.payload);
      const updatedCartCount = filteredCartItems.reduce((total, item) => total + item.quantity, 0);
      
      return {
        ...state,
        cartItems: filteredCartItems,
        cartCount: updatedCartCount
      };
    
    case ActionTypes.UPDATE_CART_QUANTITY:
      const updatedItems = state.cartItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      const finalCartCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
      
      return {
        ...state,
        cartItems: updatedItems,
        cartCount: finalCartCount
      };
    
    case ActionTypes.SET_WISHLIST_ITEMS:
      return {
        ...state,
        wishlistItems: action.payload,
        wishlistCount: action.payload.length
      };
    
    case ActionTypes.ADD_TO_WISHLIST:
      const isInWishlist = state.wishlistItems.some(item => item.id === action.payload.id);
      if (isInWishlist) return state;
      
      const updatedWishlist = [...state.wishlistItems, action.payload];
      return {
        ...state,
        wishlistItems: updatedWishlist,
        wishlistCount: updatedWishlist.length
      };
    
    case ActionTypes.REMOVE_FROM_WISHLIST:
      const filteredWishlist = state.wishlistItems.filter(item => item.id !== action.payload);
      return {
        ...state,
        wishlistItems: filteredWishlist,
        wishlistCount: filteredWishlist.length
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize app state on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check for stored user data
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch({ type: ActionTypes.SET_USER, payload: user });
          
          // Load user's cart and wishlist
          await loadUserData(token);
        } else {
          dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
        
        // Load cart from localStorage for non-authenticated users
        const savedCart = localStorage.getItem('cart');
        if (savedCart && !token) {
          const cartItems = JSON.parse(savedCart);
          dispatch({ type: ActionTypes.SET_CART_ITEMS, payload: cartItems });
        }
        
        // Load wishlist from localStorage for non-authenticated users
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist && !token) {
          const wishlistItems = JSON.parse(savedWishlist);
          dispatch({ type: ActionTypes.SET_WISHLIST_ITEMS, payload: wishlistItems });
        }
        
      } catch (error) {
        console.error('Error initializing app:', error);
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    };

    initializeApp();
  }, []);

  // Load user data from server
  const loadUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch({ type: ActionTypes.SET_USER, payload: userData.user });
        
        // Load cart and wishlist if available
        // Note: These endpoints would need to be implemented in the backend
        // For now, we'll use localStorage as fallback
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Action creators
  const actions = {
    login: (user, token) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: ActionTypes.SET_USER, payload: user });
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');
      dispatch({ type: ActionTypes.LOGOUT });
    },

    addToCart: (product) => {
      dispatch({ type: ActionTypes.ADD_TO_CART, payload: product });
      
      // Sync with localStorage for non-authenticated users
      if (!state.isAuthenticated) {
        const updatedCart = [...state.cartItems];
        const existingIndex = updatedCart.findIndex(item => item.id === product.id);
        
        if (existingIndex >= 0) {
          updatedCart[existingIndex].quantity += (product.quantity || 1);
        } else {
          updatedCart.push({ ...product, quantity: product.quantity || 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    },

    removeFromCart: (productId) => {
      dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: productId });
      
      // Sync with localStorage
      if (!state.isAuthenticated) {
        const updatedCart = state.cartItems.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    },

    updateCartQuantity: (productId, quantity) => {
      dispatch({ type: ActionTypes.UPDATE_CART_QUANTITY, payload: { id: productId, quantity } });
      
      // Sync with localStorage
      if (!state.isAuthenticated) {
        const updatedCart = state.cartItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        ).filter(item => item.quantity > 0);
        
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    },

    addToWishlist: (product) => {
      dispatch({ type: ActionTypes.ADD_TO_WISHLIST, payload: product });
      
      // Sync with localStorage for non-authenticated users
      if (!state.isAuthenticated) {
        const updatedWishlist = [...state.wishlistItems, product];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      }
    },

    removeFromWishlist: (productId) => {
      dispatch({ type: ActionTypes.REMOVE_FROM_WISHLIST, payload: productId });
      
      // Sync with localStorage
      if (!state.isAuthenticated) {
        const updatedWishlist = state.wishlistItems.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      }
    }
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;