// In your frontend payment handler
try {
  const response = await fetch("https://yourdomain.com/stkpush", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      phone, 
      amount, 
      service,
      timestamp: new Date().toISOString()
    })
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.details || result.error || "Payment failed");
  }
  
  if (result.ResponseCode === "0") {
    showMessage("STK Push sent. Please complete the payment on your phone.", "success");
    
    // Store transaction ID for status checking
    localStorage.setItem('lastTransactionId', result.transactionId);
    
  } else {
    throw new Error(result.details || "Payment initiation failed");
  }
} catch (err) {
  console.error(err);
  showMessage(err.message, "error");
}