import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import stripe from "stripe";

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;
    if (!address || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Address and items are required" });
    }

    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // add tax charge of 2% to the amount
    amount = Math.floor(amount + amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: false,
    });
    res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// this is for stripe payment
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Address and items are required" });
    }

    let productData = [];

    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // add tax charge of 2% to the amount
    amount = Math.floor(amount + amount * 0.02);
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    // Stripe gateway integration
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // create line items for stripe

    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            // images: ["https://example.com/image.png"],
          },
          unit_amount: (item.price + item.price * 0.02) * 100, // amount in paise
        },
        quantity: item.quantity,
      };
    });

    // create session for stripe
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// stripe webhook for payment confirmation
export const stripeWebhook = async (req, res) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(`Webhook Error: ${error.message}`);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting session metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      const { orderId, userId } = session.data[0].metadata;

      // mark payment as paid
      await Order.findByIdAndUpdate(orderId, {
        isPaid: true,
        paymentType: "Online",
      });
      // clear user cart
      await User.findByIdAndUpdate(userId, {
        cartItems: {},
      });

      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId } = session.data[0].metadata;
      await Order.findByIdAndDelete(orderId);
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }
  res.status(200).json({ received: true });
};
