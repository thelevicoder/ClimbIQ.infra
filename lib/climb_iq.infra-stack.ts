import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { join } from 'path';


export class ClimbIqInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const climbIQinfraRole = new iam.Role(this, 'ClimbIQInfraRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      

    });

    climbIQinfraRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'logs:CreateLogGroup',
        'logs:CreateLogStream',
        'logs:PutLogEvents',
        'dynamodb:Scan', // Add Scan permission
        'dynamodb:GetItem', // Add GetItem permission
        'dynamodb:PutItem', // Add PutItem permission
        'dynamodb:UpdateItem', // Add UpdateItem permission
        'dynamodb:DeleteItem' // Add DeleteItem permission
      ],
      resources: [
        'arn:aws:logs:*:*:*',
        'arn:aws:dynamodb:us-east-1:288761739161:table/UserData'
         // Add DynamoDB table ARN
      ],
    }));

    new NodejsFunction(this, 'ClimbIQInfraFunction', {
      functionName: 'ClimbIQInfraFunction',
      runtime: lambda.Runtime.NODEJS_20_X, // Change runtime to Node.js 18.x
      handler: 'ClimbIQGrade', // Ensure the handler matches the exported function
      entry: join(__dirname, 'handlers', 'ClimbIQGrade.js'), // Ensure the path is correct
      role: climbIQinfraRole,
    });


  }
}

