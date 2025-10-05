const { Kafka } = require('kafkajs');

async function run() {
  const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092']
});


  const producer = kafka.producer();
  await producer.connect();

  const result = await producer.send({
    topic: 'test-topic',
    messages: [{ value: 'Hello from Producer!' }],
  });

  console.log('Message sent:', result);
  await producer.disconnect();
}

run().catch(console.error);
