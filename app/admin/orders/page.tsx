export const dynamic = 'force-dynamic'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Order = {
   id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  totalAmount: number;
  createdAt: Date;
};


export default async function OrdersPage() {
  const orders: Order[] = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="orders-container">
      <h1 className="orders-title">All Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.customerName}</td>
                  <td>{o.customerEmail}</td>
                  <td>{o.customerPhone}</td>
                  <td>₦{o.totalAmount.toLocaleString()}</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
