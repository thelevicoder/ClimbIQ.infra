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
      actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
      resources: ['arn:aws:logs:*:*:*'],
    }));

    new NodejsFunction(this, 'ClimbIQInfraFunction', {
      functionName: 'ClimbIQInfraFunction',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'ClimbIQGrade', // Ensure the handler matches the file name
      entry: join(__dirname, 'handlers', 'ClimbIQGrade.js'),
      role: climbIQinfraRole,
    });


  }
}

