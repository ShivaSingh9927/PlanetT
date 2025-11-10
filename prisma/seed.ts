import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Premium Leather Jacket", price: 249.99, category: "Jackets", image: "/black-leather-men-jacket.jpg" },
      { name: "Classic Denim Jeans", price: 99.99, category: "Jeans", image: "/dark-blue-denim-jeans.jpg" },
      { name: "Cotton Crew Shirt", price: 49.99, category: "Shirts", image: "/white-cotton-men-shirt.jpg" },
      { name: "Wool Blazer", price: 299.99, category: "Jackets", image: "/black-wool-blazer.jpg" },
    ],
  })
}

main()
  .then(() => {
    console.log("✅ Database seeded successfully")
  })
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
