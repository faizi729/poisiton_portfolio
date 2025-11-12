import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "trade-service",
  brokers: [process.env.KAFKA_BROKER], 
});

export const tradeProducer = kafka.producer();
export const tradeConsumer = kafka.consumer({ groupId: "trade-group" });

export const connectKafka = async () => {
  console.log("Kafka Broker:", process.env.KAFKA_BROKER);
  try {
    await tradeProducer.connect();
    await tradeConsumer.connect();
    console.log("✅ Kafka connected successfully to Railway");
  } catch (error) {
    console.error("❌ Kafka connection failed:", error);
  }
};
