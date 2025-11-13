import { Kafka } from "kafkajs";
import { tradeConsumer } from "../../config/kafka.js";
import logger from "../../config/winston.js";

 

export const startTradeConsumer = async () => {
  // Initialize Kafka lazily (only when function runs)
  const kafka = new Kafka({
    clientId: "trade-service",
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  });

  const tradeConsumer = kafka.consumer({ groupId: "trade-group" });
  await tradeConsumer.connect();
  await tradeConsumer.subscribe({ topic: "trade-events", fromBeginning: true });

  await tradeConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      logger.info(
        `📥 Consumed trade event: ${data.tradeType} ${data.symbol} for user ${data.userId}`
      );
    },
  });
};