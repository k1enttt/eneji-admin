import { MedusaRequest, MedusaResponse, OrderService } from "@medusajs/medusa";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const orderService = req.scope.resolve<OrderService>("orderService");
  const orderId = req.params.id;

  // must be previously logged in or use api token
  try {
    const order = await orderService.retrieve(orderId);

    if (order) await orderService.capturePayment(order.id);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const AUTHENTICATE = false;
