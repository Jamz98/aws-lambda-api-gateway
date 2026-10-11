import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddb = DynamoDBDocumentClient.from(ddbClient);

const TABLE_NAME = process.env.TABLE_NAME || "UserData";

async function handler(event) {
  const userId = event?.queryStringParameters?.userId;

  if (!userId) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "userId query parameter is required" })
    };
  }

  const params = {
    TableName: TABLE_NAME,
    Key: { userId }
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await ddb.send(command);

    if (Item) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Item)
      };
    }

    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "No user data found" })
    };
  } catch (err) {
    console.error("Unable to retrieve data:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Failed to retrieve user data" })
    };
  }
}

export { handler };
