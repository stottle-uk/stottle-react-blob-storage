docker build -t stottleuk/blob-storage-react  .

docker tag stottleuk/blob-storage-react stottlecontainerregistry.azurecr.io/blob-storage-react

docker run -p 3000:80 --rm stottlecontainerregistry.azurecr.io/blob-storage-react

# docker push stottlecontainerregistry.azurecr.io/blob-storage-react