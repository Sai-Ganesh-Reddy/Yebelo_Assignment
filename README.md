# 🧩 Yebelo Assignment — Data Processing API

This project is built as part of the **Yebelo Technical Assignment**, developed in **three phases** to demonstrate API development, data processing, and integration with MongoDB and Kafka.

---

## 🚀 Project Overview

The project simulates a complete backend workflow:
1. **Phase 1** — Data ingestion and basic API setup.
2. **Phase 2** — Integration with Kafka for message streaming.
3. **Phase 3** — Processor service for Kafka messages and MongoDB persistence.

The final output is a modular Node.js-based microservice setup using **Docker**, **Express**, **KafkaJS**, and **MongoDB**.

---

## 🏗️ Folder Structure

yebelo-assignment/
│
├── phase1/
│ └── server.js
│
├── phase2/
│ ├── kafka/
│ │ ├── producer.js
│ │ └── consumer.js
│ ├── routes/
│ │ └── api.js
│ ├── models/
│ │ └── DataModel.js
│ └── server.js
│
├── phase3/
│ ├── processor.js
│ ├── package.json
│ └── Dockerfile
│
├── docker-compose.yml
└── README.md 
---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <>
cd yebelo-assignment
2️⃣ Create Docker Containers

docker-compose up --build
3️⃣ Verify Containers

docker ps
Expected containers:

mongo → MongoDB service

redpanda → Kafka broker

yebelo-api → Node.js API service

yebelo-processor → Kafka consumer/processor service

🧪 Testing the API
Once Docker services are up, open your browser or use Postman to test:

Base URL:
arduino

http://localhost:4000
Example Endpoint (Phase 2)
POST /api/data
Sends data to Kafka for processing.

json

{
  "message": "Hello from API"
}
Response:

json

{
  "status": "success",
  "data": "Message sent to Kafka successfully"
}
🧰 Tech Stack
Layer	Technology
Runtime	Node.js
Framework	Express.js
Database	MongoDB
Messaging	Kafka (via Redpanda)
Containerization	Docker & Docker Compose
ODM	Mongoose
Message Client	KafkaJS

🔄 Phase 3: Processor Service
Consumes messages from Kafka topic.

Processes and stores messages into MongoDB (yebeloDB).

Displays connection and processing logs in the terminal.

Run manually (if needed):


cd phase3
node processor.js
✅ Verification
Check if the processor stored data in MongoDB:


docker exec -it mongo mongosh
use yebeloDB
db.processedData.find().pretty()
🧠 Key Learnings
Building event-driven microservices with Kafka.

Using Mongoose for schema-based MongoDB integration.

Running multi-container setups using Docker Compose.

Clean separation of producer, consumer, and API logic.

📜 License
This project is created for educational and evaluation purposes under the Yebelo Technical Assignment guidelines.

👩‍💻 Author
Lahari Prasanna Yarlagadda
Yebelo Technical Assignment — 2025
