const User = require("../models/User");
const bcrypt = require("bcrypt");

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    console.log("Cleared existing users");
    const adminPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      userName: "Yasser hhhhhhhhhhhhhh",
      email: "yasser1aboussikine@gmail.com",
      password: adminPassword,
      role: "admin",
    });
    const ownerPassword = await bcrypt.hash("owner123", 10);
    const hotelOwner = await User.create({
      userName: "Yasser Owner",
      email: "yasseraboussikine99@gmail.com",
      password: ownerPassword,
      role: "hotelOwner",
    });
    const users = [
      {
        userName: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "client",
      },
      {
        userName: "Jane Smith",
        email: "jane@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "client",
      },
      {
        userName: "Mike Johnson",
        email: "mike@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "client",
      },
      {
        userName: "Sarah Wilson",
        email: "sarah@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "client",
      },
      {
        userName: "David Brown",
        email: "david@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "client",
      },
    ];

    const createdUsers = await User.create(users);

    console.log("✅ Users seeded successfully!");
    console.log(`Created ${createdUsers.length + 2} users:`);
    console.log("- Admin: admin@hotelbooking.com (password: admin123)");
    console.log("- Owner: owner@hotelbooking.com (password: owner123)");
    console.log(
      "- Clients: john@example.com, jane@example.com, mike@example.com, sarah@example.com, david@example.com (password: password123)"
    );

    return { adminUser, hotelOwner, createdUsers };
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw error;
  }
};

module.exports = seedUsers;
