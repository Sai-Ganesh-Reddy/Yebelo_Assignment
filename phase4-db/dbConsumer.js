// dbConsumer.js
const { Kafka } = require("kafkajs");
const mongoose = require("mongoose");

// 1️⃣ Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/yebeloDB";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 2️⃣ Define schema & model
const messageSchema = new mongoose.Schema({
  content: String,
  timestamp: { type: Date, default: Date.now },
});
const ProcessedMessage = mongoose.model("ProcessedMessage", messageSchema);

// 3️⃣ Kafka consumer setup
const kafka = new Kafka({
  clientId: "db-consumer",
  brokers: ["localhost:9092"], // matches Redpanda broker
});

const consumer = kafka.consumer({ groupId: "db-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "processed-topic", fromBeginning: true });
  console.log("📡 Listening to processed-topic...");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      console.log("💾 Received from processed-topic:", value);

      const doc = new ProcessedMessage({ content: value });
      await doc.save();

      console.log("✅ Saved to MongoDB:", value);
    },
  });
}

run().catch(console.error);
