const ticketModel = require("../model/ticketModel");
const stripe = require('stripe')
const sskey = 'whsec_0343984226f3113cf5b80c347daa5acf4d07a0a95246ff12a2ef7e4a674aa682';
exports.getAvailableTickets = async (req, res, next) => {
  console.log("In getAvailableTickets controller");
  try {
    const { placeid, selectedDate } = req.params;
    console.log(selectedDate);
    const [availableTickets, bookedTickets] = await Promise.all([
      ticketModel.getAvailableTickets(placeid),
      ticketModel.getBookedTickets(placeid, selectedDate),
    ]);

    // Calculate the difference between available and booked tickets
    const remainingTickets = availableTickets - bookedTickets;

    res.status(200).json({ remainingTickets });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.createCheckoutSession = async (req, res, next) => {
  const purchaseTicket= req.body;
  try {
    const session = await ticketModel.createCheckoutSession(purchaseTicket);
    console.log(session);
    // Add booking details to the database after successful payment
    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

// Function to handle Stripe webhook events

// stripeController.js
exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];


  const payload = req.body;
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: 'whsec_0343984226f3113cf5b80c347daa5acf4d07a0a95246ff12a2ef7e4a674aa682'
  });

  
  try {
    const event = stripe.webhooks.constructEvent(payloadString, header, process.env.STRIPE_ENDPOINT_SECRET);

    // Process the event according to its type
    if (event.type === 'payment_intent.succeeded') {

      //const purchaseTicketMetadata = event.data.object.metadata.purchaseTicket;
    //const purchaseTicket = JSON.parse(purchaseTicketMetadata);
    console.log(event.data.object.metadata);
      console.log("00000000000000000000000");
      console.log('Payment intent succeeded:', event.data.object.id);
      
     //console.log(purchaseTicket);
      console.log("1111111111111111111111")
      
      // Perform necessary actions for successful payment intent
    } else {
      console.log('Unhandled event type:', event.type);
    }

    res.sendStatus(200); // Send the response to the client after handling the event
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
};

