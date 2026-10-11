# Architecture Notes

## Request Flow

```text
1. User sends GET /users?userId=123
2. API Gateway receives the request
3. API Gateway invokes AWS Lambda
4. Lambda reads userId from the query string
5. Lambda sends GetItem request to DynamoDB
6. DynamoDB returns the matching record
7. Lambda returns a JSON response
8. API Gateway sends the response back to the user
```

## Current Project Status

The API Gateway and Lambda integration are complete. The DynamoDB table is intentionally not yet configured because it is introduced in the next project in the learning series.
