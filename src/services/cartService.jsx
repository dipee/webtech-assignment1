// use context to get user id

// fetch call cart api to add item to cart

export const saveCart = async (userId, product, quantity) => {
  console.log("userId", userId);
  console.log("productId", product);
  console.log("quantity", quantity);
  const response = await fetch(`http://localhost:3001/carts/user/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: product.productId,
      quantity,
      name: product.name,
      price: product.price,
      image: product.image,
    }),
  });
  const data = await response.json();

  return data;
};

export const getCart = async (userId) => {
  const response = await fetch(`http://localhost:3001/carts/user/${userId}`);
  const data = await response.json();
  console.log("data");
  console.log(data);
  return data;
};

export const decreaseQtyFromCart = async (cartId, productId) => {
  const response = await fetch(
    `http://localhost:3001/carts/${cartId}/product/${productId}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
};

export const removeItemFromCart = async (cartId, productId) => {
  const response = await fetch(
    `http://localhost:3001/carts/${cartId}/remove_product/${productId}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
};
