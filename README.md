# When you begin :

You have to create a .env file 

## The commands to generate a token : 

>`ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key`
#### Don't add passphrase
>`openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub`