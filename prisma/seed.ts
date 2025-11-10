import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // 1️⃣ Create products
  const products = await prisma.product.createMany({
    data: [
      { name: "Premium Leather Jacket", price: 249.99, category: "Jackets", image: "/black-leather-men-jacket.jpg" },
      { name: "Classic Denim Jeans", price: 99.99, category: "Jeans", image: "/dark-blue-denim-jeans.jpg" },
      { name: "Cotton Crew Shirt", price: 49.99, category: "Shirts", image: "/white-cotton-men-shirt.jpg" },
      { name: "Wool Blazer", price: 299.99, category: "Jackets", image: "/black-wool-blazer.jpg" },
    ],
  })
  console.log("✅ Products added")

  // 2️⃣ Create users
  const user1 = await prisma.user.create({
    data: {
      email: "john@example.com",
      name: "John Doe",
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice Smith",
    },
  })
  console.log("✅ Users added")

  // 3️⃣ Fetch products for order linking
  const allProducts = await prisma.product.findMany()

  // 4️⃣ Create orders
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      products: {
        create: [
          {
            productId: allProducts[0].id,
            quantity: 1,
          },
          {
            productId: allProducts[1].id,
            quantity: 2,
          },
        ],
      },
    },
  })

  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      products: {
        create: [
          {
            productId: allProducts[2].id,
            quantity: 1,
          },
        ],
      },
    },
  })

  console.log("✅ Orders and order items created")
}

main()
  .then(() => {
    console.log("🌟 Database seeded successfully")
  })
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
