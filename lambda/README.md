# AWS lambda

## lambda 사용 이유
##### 백엔드 서버에서 사진 resize 기능을 하도록하면 과부하가 걸릴 수 있기 때문에 AWS에서 제공하는 lambda를 사용하여 S3에 연동해서 백엔드에 무리가 가지 않으면서 사진을 조절할 수 있도록했습니다.

## 사용 방법
### npm i --force
### zip -r aws-upload.zip ./*
### curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
### unzip awscliv2.zip
### ./aws/install
### aws configure
> #### AWS ACCESS KEY ID : [입력]
> #### AWS ACCESS SCCRET KEY : [입력]
> #### Default resion name : [입력]
> #### Default output format : [json]

### aws s3 cp "aws-upload.zip" s3://[s3 저장소이름]

### 이후 AWS lambda로 가서 함수 생성을 하면 됩니다.
