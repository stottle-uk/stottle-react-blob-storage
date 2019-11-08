docker build -t stottleuk/react-blob-storage  .

docker tag stottleuk/react-blob-storage stottlecontainerregistry.azurecr.io/react-blob-storage

docker run -p 3000:80 --rm stottlecontainerregistry.azurecr.io/react-blob-storage

# docker push stottlecontainerregistry.azurecr.io/react-blob-storage