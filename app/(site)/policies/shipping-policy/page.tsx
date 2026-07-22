export default function ShippingPolicyPage() {
  return (
    <>
      <h1>Shipping Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Processing Times</h2>
      <p>Ready-made crochet items and accessories are typically processed and dispatched within 2-3 business days. Custom orders have variable processing times which will be communicated during the design process.</p>
      
      <h2>2. Shipping Rates & Delivery Estimates</h2>
      <p>Shipping charges for your order will be calculated and displayed at checkout. We offer nationwide delivery within South Africa. Delivery typically takes 3-5 business days after dispatch.</p>
      
      <h2>3. Free Shipping</h2>
      <p>We offer free standard shipping on all orders over R1500.</p>
      
      <h2>4. Order Tracking</h2>
      <p>Once your order has shipped, you will receive a shipping confirmation email containing your tracking number(s). The tracking link will be active within 24 hours.</p>
    </>
  )
}
