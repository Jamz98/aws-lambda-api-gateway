# Serverless API with AWS Lambda and API Gateway

This project demonstrates how to build and deploy a serverless API using AWS Lambda and Amazon API Gateway.

It was completed as part of the NextWork AWS learning pathway and focuses on the logic tier of a three-tier architecture. The API exposes a `/users` resource with a `GET` method that invokes a Lambda function designed to retrieve user data from Amazon DynamoDB.

> Learning source: NextWork. This repository contains my own project notes, implementation, and documentation based on the guided lab.

## Architecture

```text
User / Browser
      |
      v
Amazon API Gateway
  GET /users
      |
      v
AWS Lambda
      |
      v
Amazon DynamoDB
   UserData table
```

At this stage of the project, the API and Lambda integration are complete. The DynamoDB table will be added in the next project in the series, so the live API will return an error until the data tier is connected.

## What I Built

- Created an AWS Lambda function for backend logic
- Configured an Amazon API Gateway REST API
- Created a `/users` API resource
- Added a `GET` method to the `/users` resource
- Connected API Gateway to the Lambda function
- Deployed the API to a `prod` stage
- Tested the production Invoke URL
- Created, published, and downloaded API documentation in JSON format

## AWS Services Used

| Service | Purpose |
|---|---|
| AWS Lambda | Runs backend code without managing servers |
| Amazon API Gateway | Exposes the Lambda function through an HTTP API endpoint |
| Amazon DynamoDB | Intended data store for user records |
| AWS IAM | Controls Lambda permissions to access AWS services |

## API Design

### Resource

```text
/users
```

### Method

```http
GET /users?userId=<user-id>
```

The API receives a `userId` query parameter and passes the request to the Lambda function.

## Lambda Function

The Lambda function:

1. Reads the `userId` value from the API Gateway query string.
2. Creates a DynamoDB `GetCommand` request.
3. Looks for the matching record in the `UserData` table.
4. Returns the record as JSON if found.
5. Returns `404` if no matching record exists.
6. Returns `500` if an unexpected error occurs.

Example success response:

```json
{
  "userId": "123",
  "name": "Example User"
}
```

Example not-found response:

```json
{
  "message": "No user data found"
}
```

## Project Structure

```text
aws-lambda-api-gateway/
├── README.md
├── lambda/
│   └── index.mjs
├── docs/
│   ├── api-documentation.json
│   └── architecture.md
├── screenshots/
│   └── .gitkeep
└── .gitignore
```

## Key Concepts Learned

### AWS Lambda

AWS Lambda is a serverless compute service that runs code in response to events without requiring you to provision or manage servers.

### API Gateway

Amazon API Gateway creates and manages APIs that allow users and applications to send requests to backend services such as Lambda.

### API Resources

Resources represent paths within an API. In this project, `/users` represents the user-data resource.

### HTTP Methods

The project uses a `GET` method to retrieve user data. Other common methods include `POST`, `PUT`, and `DELETE`.

### Stages

A stage is a deployed version of an API. I deployed this API to a `prod` stage, which generated a public Invoke URL.

### API Documentation

I created documentation in API Gateway describing the API resource, method, parameters, and expected responses, then published and downloaded it in JSON format.

## What I Learned

This project helped me understand how AWS Lambda and API Gateway work together to form a serverless backend. I also gained practical experience with API resources, HTTP methods, deployment stages, Invoke URLs, JSON responses, and API documentation.

The most challenging part was understanding how API Gateway resources, methods, stages, and Lambda integrations fit together. The most rewarding part was deploying the API and seeing how backend functionality can be exposed without managing traditional servers.

## Three-Tier Architecture Series

This project is part of a wider three-tier architecture learning series:

- Part 1: Website Delivery with CloudFront
- Part 2: APIs with Lambda + API Gateway
- Part 3: Fetch Data with AWS Lambda
- Part 4: Build a Three-Tier Web App

This repository represents the logic tier of that architecture.

## Next Steps

- Create the DynamoDB `UserData` table
- Connect the Lambda function to the data tier
- Add the required IAM permissions
- Test successful database retrieval through the API
- Integrate the API with the frontend tier
- Add screenshots of the Lambda function, API Gateway resources, deployed `prod` stage, and API documentation

## Author

Muse Jama

Cloud / DevOps portfolio project focused on AWS serverless architecture.
