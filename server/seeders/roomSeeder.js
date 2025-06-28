const Room = require("../models/Room");

const seedRooms = async (hotelOwner) => {
  try {
    await Room.deleteMany({});
    console.log("Cleared existing rooms");

    const rooms = [
      {
        name: "Luxury Suite with Ocean View",
        description:
          "Spacious luxury suite featuring breathtaking ocean views, premium amenities, and elegant furnishings. Perfect for romantic getaways or business travelers seeking comfort and style.",
        pricePerNight: 450,
        capacity: 4,
        roomType: "Suite",
        amenities: [
          "Free WiFi",
          "Free Breakfast",
          "Room Service",
          "Pool Access",
          "Mountain View",
        ],
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
        ],
        isAvailable: true,
        rating: 4.8,
        hotel: {
          name: "Oceanview Resort & Spa",
          address: "123 Beach Boulevard, Miami, FL 33139",
          city: "Miami",
          contact: "+1-305-555-0123",
          owner: hotelOwner._id,
        },
      },
      {
        name: "Deluxe Double Room",
        description:
          "Comfortable double room with modern amenities, perfect for couples or solo travelers. Features a queen-size bed and city views.",
        pricePerNight: 280,
        capacity: 2,
        roomType: "Double Bed",
        amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800",
          "https://images.unsplash.com/photo-1631049184852-3e3c3c3c3c3c?w=800",
        ],
        isAvailable: true,
        rating: 4.5,
        hotel: {
          name: "Urban Comfort Hotel",
          address: "456 Downtown Street, New York, NY 10001",
          city: "New York",
          contact: "+1-212-555-0456",
          owner: hotelOwner._id,
        },
      },
      {
        name: "Family Suite",
        description:
          "Large family suite with two bedrooms, living area, and kitchenette. Ideal for families or groups traveling together.",
        pricePerNight: 380,
        capacity: 6,
        roomType: "Family",
        amenities: [
          "Free WiFi",
          "Free Breakfast",
          "Room Service",
          "Mountain View",
        ],
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
        ],
        isAvailable: true,
        rating: 4.6,
        hotel: {
          name: "Mountain View Lodge",
          address: "789 Mountain Road, Denver, CO 80202",
          city: "Denver",
          contact: "+1-303-555-0789",
          owner: hotelOwner._id,
        },
      },
      {
        name: "Executive Single Room",
        description:
          "Elegant single room designed for business travelers. Features a comfortable king-size bed and work desk.",
        pricePerNight: 220,
        capacity: 1,
        roomType: "Single Bed",
        amenities: ["Free WiFi", "Room Service"],
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800",
          "https://images.unsplash.com/photo-1631049184852-3e3c3c3c3c3c?w=800",
        ],
        isAvailable: true,
        rating: 4.3,
        hotel: {
          name: "Business Center Hotel",
          address: "321 Corporate Plaza, Chicago, IL 60601",
          city: "Chicago",
          contact: "+1-312-555-0321",
          owner: hotelOwner._id,
        },
      },
      {
        name: "Presidential Suite",
        description:
          "Ultimate luxury experience with panoramic city views, private balcony, and premium services. The epitome of luxury accommodation.",
        pricePerNight: 850,
        capacity: 4,
        roomType: "Suite",
        amenities: [
          "Free WiFi",
          "Free Breakfast",
          "Room Service",
          "Pool Access",
        ],
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
        ],
        isAvailable: true,
        rating: 4.9,
        hotel: {
          name: "Grand Luxury Hotel",
          address: "654 Luxury Avenue, Los Angeles, CA 90210",
          city: "Los Angeles",
          contact: "+1-310-555-0654",
          owner: hotelOwner._id,
        },
      },
      {
        name: "Cozy Studio Apartment",
        description:
          "Charming studio apartment with kitchenette and city views. Perfect for extended stays or budget-conscious travelers.",
        pricePerNight: 180,
        capacity: 2,
        roomType: "Deluxe",
        amenities: ["Free WiFi"],
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800",
          "https://images.unsplash.com/photo-1631049184852-3e3c3c3c3c3c?w=800",
        ],
        isAvailable: true,
        rating: 4.2,
        hotel: {
          name: "City Comfort Inn",
          address: "987 Urban Street, Seattle, WA 98101",
          city: "Seattle",
          contact: "+1-206-555-0987",
          owner: hotelOwner._id,
        },
      },
      {
        name: "Garden View Room",
        description:
          "Peaceful room overlooking our beautiful gardens. Features a comfortable bed and relaxing atmosphere.",
        pricePerNight: 250,
        capacity: 2,
        roomType: "Double Bed",
        amenities: ["Free WiFi", "Free Breakfast"],
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
        ],
        isAvailable: true,
        rating: 4.4,
        hotel: {
          name: "Garden Retreat Hotel",
          address: "147 Garden Lane, Portland, OR 97201",
          city: "Portland",
          contact: "+1-503-555-0147",
          owner: hotelOwner._id,
        },
      },
      {
        name: "Penthouse Suite",
        description:
          "Exclusive penthouse suite with 360-degree city views, private terrace, and luxury amenities.",
        pricePerNight: 1200,
        capacity: 6,
        roomType: "Suite",
        amenities: [
          "Free WiFi",
          "Free Breakfast",
          "Room Service",
          "Pool Access",
        ],
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
        ],
        isAvailable: true,
        rating: 4.9,
        hotel: {
          name: "Skyline Grand Hotel",
          address: "321 Skyline Blvd, San Francisco, CA 94107",
          city: "San Francisco",
          contact: "+1-415-555-0321",
          owner: hotelOwner._id,
        },
      },
    ];

    const createdRooms = await Room.create(rooms);

    console.log("✅ Rooms seeded successfully!");
    console.log(
      `Created ${createdRooms.length} rooms with various types and amenities`
    );

    return createdRooms;
  } catch (error) {
    console.error("❌ Error seeding rooms:", error);
    throw error;
  }
};

module.exports = seedRooms;
