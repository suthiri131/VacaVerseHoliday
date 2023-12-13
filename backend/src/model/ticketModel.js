const pool = require("../config/database");
const Stripe = require('stripe')
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);


// Function to get available tickets for a specific place and date
exports.getAvailableTickets = async (placeid) => {
    try {
      const query = `select tickets from places where placeid = $1;`;
  
      const result = await pool.query(query, [placeid]);
console.log("Result from getAvailableTickets:"+ result.rows[0].tickets);

      return result.rows[0].tickets;
    } catch (error) {
        console.log("errorr")
      console.error("Error fetching available tickets:", error);
      throw error;
    }
  };
  
  // Function to get booked tickets for a specific place and date
  exports.getBookedTickets = async (placeid, selectedDate) => {
    console.log("selectedDate"+selectedDate);
    try {
      const query = `SELECT COALESCE(SUM(numberoftickets), 0) AS total_tickets
      FROM bookings
      WHERE placeid = $1 AND datebooked = $2
      
      `;
  
      const resultBooked = await pool.query(query, [placeid, selectedDate]);
      console.log("------------------")
console.log("Result from getBookedTickets:"+resultBooked.rows[0].total_tickets);
console.log("eeeeeeeeeeeeeeee")
      return resultBooked.rows[0].total_tickets;
    } catch (error) {
        console.log("erorr");
      console.error("Error fetching booked tickets:", error);
      throw error;
    }
  };

  exports.createCheckoutSession = async (purchaseTicket) => {
    const totalAmount = purchaseTicket.price*100;
    const quantity = purchaseTicket.quantity;
    try {
      const session = await stripe.checkout.sessions.create({
       line_items :[
        {
        price_data:{
          currency:"sgd",
          product_data:{
            name:purchaseTicket.placeName
          },
          unit_amount:totalAmount
        },
        quantity:quantity,
      }
      ],
     
        mode: 'payment',
        success_url: `${process.env.CLIENT_BASE_URL}/myBookings`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/book-place/${purchaseTicket.placeId}`,
        metadata: {
          purchaseTicket: JSON.stringify(purchaseTicket) // Add purchaseTicket as metadata
        }
      });

      if(session.id){
        // Perform database insertion using information related to purchaseTicket
        
        const insertQuery = `INSERT INTO bookings (userid, placeid, datebooked, bookingdate, numberoftickets)
        VALUES ($1, $2, $3, $4, $5) RETURNING bookingid`;
        const insertValues = [purchaseTicket.userId,purchaseTicket.placeId,purchaseTicket.selectedDate,purchaseTicket.todayDate,purchaseTicket.quantity]; // Values to be inserted
        const result = await pool.query(insertQuery, insertValues);
const bookingId = result.rows[0].bookingid; // Extracting the bookingid from the result




        const paymentsInsertQuery = `INSERT INTO payments (bookingid, amountpaid, paymentdate, paymentmethod, transactionid)
        VALUES ($1,$2, $3, $4, $5);`;
            const paymentsInsertValues = [bookingId,purchaseTicket.totalAmount,purchaseTicket.todayDate,'credit card',session.id];
            await pool.query(paymentsInsertQuery, paymentsInsertValues);

            console.log('Data inserted into the database after successful session creation.');

      }

      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  };


