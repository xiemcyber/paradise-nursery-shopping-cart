import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400', cost: '$15', description: 'Produces oxygen at night and is easy to care for.' },
      { name: 'Spider Plant', image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400', cost: '$12', description: 'Filters indoor air and thrives in indirect light.' },
      { name: 'Peace Lily', image: 'https://images.unsplash.com/photo-1593691509926-2e8c0d4b7c2f?w=400', cost: '$18', description: 'Removes mold spores and adds classic greenery.' },
      { name: 'Boston Fern', image: 'https://images.unsplash.com/photo-1587334274328-64186a80a945?w=400', cost: '$14', description: 'Lush fronds that naturally humidify dry rooms.' },
      { name: 'Rubber Plant', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400', cost: '$22', description: 'Bold glossy leaves that tolerate low light.' },
      { name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400', cost: '$20', description: 'Extremely resilient plant needing minimal watering.' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://images.unsplash.com/photo-1565011523534-747a8601f10a?w=400', cost: '$16', description: 'Calming scent and purple blooms for sunny spots.' },
      { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=400', cost: '$19', description: 'Sweet fragrance especially strong in the evening.' },
      { name: 'Rosemary', image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400', cost: '$11', description: 'Pine-like aroma great for cooking and sun.' },
      { name: 'Mint', image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400', cost: '$10', description: 'Refreshing herb with vibrant green leaves.' },
      { name: 'Lemon Balm', image: 'https://images.unsplash.com/photo-1591857177580-dc825de3e9c5?w=400', cost: '$12', description: 'Bright citrus scent when leaves are brushed.' },
      { name: 'Eucalyptus', image: 'https://images.unsplash.com/photo-1589244159943-460088ed5c92?w=400', cost: '$21', description: 'Silver-green foliage with a crisp, clean aroma.' },
    ],
  },
  {
    category: 'Low Maintenance Succulents',
    plants: [
      { name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1509423350716-9f20460e27f2?w=400', cost: '$13', description: 'Soothing gel inside thick leaves; loves bright light.' },
      { name: 'Echeveria', image: 'https://images.unsplash.com/photo-1520302519799-3ca78b8e2e61?w=400', cost: '$9', description: 'Compact rosette succulent in pastel tones.' },
      { name: 'Jade Plant', image: 'https://images.unsplash.com/photo-1509587584826-7933a0b2dd58?w=400', cost: '$15', description: 'Woody stems and thick leaves symbolizing good luck.' },
      { name: 'Haworthia', image: 'https://images.unsplash.com/photo-1567331711402-163c1430c9bb?w=400', cost: '$11', description: 'Small striped succulent ideal for desks.' },
      { name: 'Burro Tail', image: 'https://images.unsplash.com/photo-1518882605630-8eb71a835474?w=400', cost: '$17', description: 'Trailing stems covered in plump bead-like leaves.' },
      { name: 'Panda Plant', image: 'https://images.unsplash.com/photo-1459411552884-841db9b35cc3?w=400', cost: '$12', description: 'Velvety leaves with dark brown edges.' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <nav className="navbar">
        <button onClick={onHomeClick}>Home</button>
        <button onClick={() => setShowCart(false)}>Plants</button>
        <button onClick={() => setShowCart(true)}>
          Cart ({totalQuantity})
        </button>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj) => (
            <div key={categoryObj.category} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="plant-list">
                {categoryObj.plants.map((plant) => {
                  const isAdded = Boolean(addedToCart[plant.name]);
                  return (
                    <div key={plant.name} className="plant-card">
                      <img src={plant.image} alt={plant.name} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p>{plant.cost}</p>
                      <button
                        disabled={isAdded}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
