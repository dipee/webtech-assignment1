export const savePayment = async (payment) => {
  const response = await fetch("http://localhost:3001/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });
  const data = await response.json();
  console.log("payment saved", data);
  return data;
};
