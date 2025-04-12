import { Order, Shop, FAQ, SEO } from "../types";

// Mock Orders data
export const mockOrders: Order[] = [
  {
    id: "1",
    customer: "John Doe",
    delivery: "Express",
    product: "Premium Headphones",
    currency: "USD",
    price: 299.99,
    method: "Credit Card",
    shop: "Electronics Store",
    device: "Mobile",
    order_date: "2023-05-15T10:30:00Z",
    delivery_date: "2023-05-18T14:00:00Z",
    status: "delivered",
  },
  {
    id: "2",
    customer: "Jane Smith",
    delivery: "Standard",
    product: "Wireless Keyboard",
    currency: "EUR",
    price: 89.99,
    method: "PayPal",
    shop: "Tech World",
    device: "Desktop",
    order_date: "2023-05-16T09:15:00Z",
    delivery_date: "2023-05-20T11:30:00Z",
    status: "processing",
  },
  {
    id: "3",
    customer: "Robert Johnson",
    delivery: "Next Day",
    product: "Smart Watch",
    currency: "GBP",
    price: 199.99,
    method: "Apple Pay",
    shop: "Gadget Hub",
    device: "Tablet",
    order_date: "2023-05-17T14:45:00Z",
    delivery_date: "2023-05-18T16:00:00Z",
    status: "paid",
  },
  {
    id: "4",
    customer: "Emily Davis",
    delivery: "Standard",
    product: "Bluetooth Speaker",
    currency: "USD",
    price: 129.99,
    method: "Credit Card",
    shop: "Electronics Store",
    device: "Mobile",
    order_date: "2023-05-18T11:20:00Z",
    delivery_date: "2023-05-22T13:45:00Z",
    status: "shipped",
  },
  {
    id: "5",
    customer: "Michael Wilson",
    delivery: "Express",
    product: "Gaming Mouse",
    currency: "CAD",
    price: 79.99,
    method: "Debit Card",
    shop: "Game Zone",
    device: "Desktop",
    order_date: "2023-05-19T16:30:00Z",
    delivery_date: "2023-05-21T10:15:00Z",
    status: "failed",
  },
];

// Mock Shops data
export const mockShops: Shop[] = [
  {
    id: "1",
    name: "Electronics Store",
    country: "United States",
    timezone: "America/New_York",
    created_at: "2022-01-15T08:00:00Z",
  },
  {
    id: "2",
    name: "Tech World",
    country: "Germany",
    timezone: "Europe/Berlin",
    created_at: "2022-02-20T10:30:00Z",
  },
  {
    id: "3",
    name: "Gadget Hub",
    country: "United Kingdom",
    timezone: "Europe/London",
    created_at: "2022-03-10T09:15:00Z",
  },
  {
    id: "4",
    name: "Game Zone",
    country: "Canada",
    timezone: "America/Toronto",
    created_at: "2022-04-05T14:45:00Z",
  },
  {
    id: "5",
    name: "Digital World",
    country: "Australia",
    timezone: "Australia/Sydney",
    created_at: "2022-05-12T11:20:00Z",
  },
];

// Mock FAQ data
export const mockFAQs: FAQ[] = [
  {
    id: "1",
    question: "How do I track my order?",
    answer:
      'You can track your order by logging into your account and visiting the "Order History" section. There you will find the tracking number and current status of your order.',
    updated_at: "2023-04-10T09:30:00Z",
  },
  {
    id: "2",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be returned in their original packaging and in the same condition as when you received them.",
    updated_at: "2023-04-15T14:20:00Z",
  },
  {
    id: "3",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination.",
    updated_at: "2023-04-20T11:45:00Z",
  },
  {
    id: "4",
    question: "How can I change or cancel my order?",
    answer:
      "You can change or cancel your order within 1 hour of placing it by contacting our customer service team. After this time, we may not be able to make changes as the order may have already been processed.",
    updated_at: "2023-04-25T16:10:00Z",
  },
  {
    id: "5",
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.",
    updated_at: "2023-04-30T10:05:00Z",
  },
];

// Mock SEO data
export const mockSEOs: SEO[] = [
  {
    id: "1",
    page: "Home",
    title: "Welcome to Our Online Store | Shop Electronics, Gadgets & More",
    description:
      "Discover the latest electronics, gadgets, and accessories at competitive prices. Fast shipping and excellent customer service.",
    keywords: ["electronics", "gadgets", "online store", "tech", "accessories"],
  },
  {
    id: "2",
    page: "Products",
    title: "Shop Our Product Range | Electronics, Gadgets & Accessories",
    description:
      "Browse our extensive range of electronics, gadgets, and accessories. Find the perfect tech for your needs.",
    keywords: [
      "products",
      "electronics",
      "gadgets",
      "accessories",
      "tech products",
    ],
  },
  {
    id: "3",
    page: "About Us",
    title: "About Our Company | Our Story, Mission & Values",
    description:
      "Learn about our company history, mission, and values. Discover why we are the preferred choice for tech enthusiasts.",
    keywords: [
      "about us",
      "company history",
      "mission",
      "values",
      "tech company",
    ],
  },
  {
    id: "4",
    page: "Contact",
    title: "Contact Us | Customer Support & Inquiries",
    description:
      "Get in touch with our customer support team for any inquiries, feedback, or assistance with your orders.",
    keywords: ["contact", "customer support", "help", "inquiries", "feedback"],
  },
  {
    id: "5",
    page: "Blog",
    title: "Tech Blog | Latest News, Tips & Reviews",
    description:
      "Stay updated with the latest tech news, tips, and product reviews from our expert team.",
    keywords: ["blog", "tech news", "tips", "reviews", "technology"],
  },
];
