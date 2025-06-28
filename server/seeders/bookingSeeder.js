const Booking = require("../models/Booking");
const User = require("../models/User");
const Room = require("../models/Room");

const seedBookings = async () => {
  try {
    const users = await User.find({ role: "client" }).limit(5);
    const rooms = await Room.find().limit(10);

    if (users.length === 0 || rooms.length === 0) {
      console.log(
        "No users or rooms found. Please run user and room seeders first."
      );
      return;
    }

    const sampleBookings = [
      {
        user: users[0]._id,
        room: rooms[0]._id,
        checkInDate: new Date("2024-02-15"),
        checkOutDate: new Date("2024-02-18"),
        totalPrice: 450,
        guests: 2,
        status: "confirmed",
        paymentMethod: "Stripe",
        isPaid: true,
        specialRequests: "Early check-in if possible",
      },
      {
        user: users[1]._id,
        room: rooms[1]._id,
        checkInDate: new Date("2024-02-20"),
        checkOutDate: new Date("2024-02-22"),
        totalPrice: 300,
        guests: 1,
        status: "pending",
        paymentMethod: "PayPal",
        isPaid: false,
        specialRequests: "High floor preferred",
      },
      {
        user: users[2]._id,
        room: rooms[2]._id,
        checkInDate: new Date("2024-02-25"),
        checkOutDate: new Date("2024-02-28"),
        totalPrice: 600,
        guests: 3,
        status: "confirmed",
        paymentMethod: "Cash",
        isPaid: true,
        specialRequests: "Extra towels needed",
      },
      {
        user: users[0]._id,
        room: rooms[3]._id,
        checkInDate: new Date("2024-03-01"),
        checkOutDate: new Date("2024-03-05"),
        totalPrice: 800,
        guests: 2,
        status: "cancelled",
        paymentMethod: "Stripe",
        isPaid: false,
        specialRequests: "",
      },
      {
        user: users[1]._id,
        room: rooms[4]._id,
        checkInDate: new Date("2024-03-10"),
        checkOutDate: new Date("2024-03-12"),
        totalPrice: 400,
        guests: 2,
        status: "completed",
        paymentMethod: "PayPal",
        isPaid: true,
        specialRequests: "Late check-out requested",
      },
    ];
    await Booking.deleteMany({});
    const createdBookings = await Booking.insertMany(sampleBookings);

    console.log(`✅ Created ${createdBookings.length} sample bookings`);

    return createdBookings;
  } catch (error) {
    console.error("❌ Error creating sample bookings:", error);
    throw error;
  }
};

module.exports = seedBookings;
