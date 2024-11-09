import { Injectable } from '@nestjs/common';
import * as AWS from "@aws-sdk/client-s3"

@Injectable()
export class AwsService {
    private s3= new S3Client({
        region: "us-east-2"
        credentials:{
            accesKeyId: process.env.acceskey_bucket,
            secretAccessKey: process.env.secretkey_bucket,
        }
    })

    async uploadFile(file: Express.Multer.File){
        const key= file.originalname
        const url= `https://nest-ocso-test-amvf.s3.us-east-2.amazonaws.com/${key}`
        const bucket= "nest-ocso-text-amvf"
        //https://nest-ocso-test-amvf.s3.us-east-2.amazonaws.com/gatito.jpg
        const command= new PutObjectCommand({
            Key: key,
            Body: file.buffer,
            "Bucket": bucket,
        })
        await this.s3.send(command);
        return url;

    }
}
