import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  TableClient,
  AzureNamedKeyCredential,
  TableEntity,
} from "@azure/data-tables";
import { v4 as uuidv4 } from "uuid";

const account = "trychatgpt";
const accountKey = process.env["AZURE_STORAGE_TABLE_KEY"];
const tableName = "SharedSystemPrompts"; // Replace with your table name

const credential = new AzureNamedKeyCredential(account, accountKey);
const tableClient = new TableClient(
  `https://${account}.table.core.windows.net`,
  tableName,
  credential
);

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const userName = req.query.userName || (req.body && req.body.userName);
  const systemPrompt =
    req.query.systemPrompt || (req.body && req.body.systemPrompt);

  // If the request is a post, then we are adding a new system prompt
  if (req.method === "POST") {
    const entity: TableEntity = {
      partitionKey: uuidv4(),
      rowKey: uuidv4(),
      userName: userName,
      systemPrompt: systemPrompt,
    };
    await tableClient.createEntity(entity);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "System prompt added",
    };
  }

  // If the request is a get, then we are getting all the system prompts
  if (req.method === "GET") {
    const entities = await tableClient.listEntities().byPage().next();
    const responseMessage = entities.value.map((entity: TableEntity) => {
      return {
        partitionKey: entity.partitionKey,
        rowKey: entity.rowKey,
        timeStamp: entity.timestamp,
        userName: entity.userName,
        systemPrompt: entity.systemPrompt,
      };
    });

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: responseMessage,
    };
  }
};

export default httpTrigger;
