export const saveOrder = async (order) => {
  const response = await fetch("http://localhost:3001/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const data = await response.json();
  return data;
};

export const getOrders = async (userId) => {
  const response = await fetch(`http://localhost:3001/orders/user/${userId}`);
  const data = await response.json();

  return data;
};
