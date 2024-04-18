export const saveOrder = async (order) => {
  const response = await fetch("http://localhost:3001/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const data = await response.json();
  console.log("order saved", data);
  return data;
};

export const getOrders = async (userId) => {
  const response = await fetch(`http://localhost:3001/orders/user/${userId}`);
  const data = await response.json();
  console.log("data");
  console.log(data);
  return data;
};
