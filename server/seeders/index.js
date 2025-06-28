const mongoose = require("mongoose");
require("dotenv").config();

// Import seeders
const seedUsers = require("./userSeeder");
const seedRooms = require("./roomSeeder");
const seedBookings = require("./bookingSeeder");

// // Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...\n");

    // Step 1: Seed Users
    console.log("📝 Seeding users...");
    const { adminUser, hotelOwner, createdUsers } = await seedUsers();
    const allUsers = [adminUser, hotelOwner, ...createdUsers];
    console.log("");

    // Step 2: Seed Rooms
    console.log("🏨 Seeding rooms...");
    const rooms = await seedRooms(hotelOwner);
    console.log("");

    // Step 4: Seed Bookings
    console.log("📅 Seeding bookings...");
    const bookings = await seedBookings(createdUsers, rooms);
    console.log("");

    // Summary
    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(
      `- Users: ${allUsers.length} (1 admin, 1 owner, ${createdUsers.length} clients)`
    );
    console.log(`- Rooms: ${rooms.length} (various types and amenities)`);
    console.log(
      `- Bookings: ${bookings.length} (various statuses and payment states)`
    );

    console.log("\n🔑 Test Accounts:");
    console.log("Admin: admin@hotelbooking.com (password: admin123)");
    console.log("Owner: owner@hotelbooking.com (password: owner123)");
    console.log("Client: john@example.com (password: password123)");

    console.log("\n🚀 You can now start the server and test the API!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
};

// Run seeder if this file is executed directly
if (require.main === module) {
  connectDB()
    .then(() => seedDatabase())
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}

module.exports = { seedDatabase, connectDB };
