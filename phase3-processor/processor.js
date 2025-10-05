// processor.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'processor-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'processor-group' });
const producer = kafka.producer();

const run = async () => {
  await consumer.connect();
  await producer.connect();

  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const received = message.value.toString();
      console.log(`📥 Received: ${received}`);

      const processed = `${received.toUpperCase()} - processed ✅`;

      await producer.send({
        topic: 'processed-topic',
        messages: [{ value: processed }],
      });

      console.log(`📤 Sent: ${processed}`);
    },
  });
};

run().catch(console.error);
