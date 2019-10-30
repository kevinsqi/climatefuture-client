## ClimateFuture

## Setup

First, set up and run the backend server with the instructions in [server/README.md](./server/README.md).

Then, run the client app:

```
cd client
yarn install
yarn dev
```

Go to http://localhost:3000/location/san-francisco to try it out.


## Deployment

* Create app: `dokku apps:create climatefuture-client`
* Add dokku remote: `git remote add dokku dokku@climatefuture.io:climatefuture-client`
* Push to dokku: `git push dokku master`
* Add domains:
  * Add DNS records to point @ and www to dokku instance
  * `dokku domains:add climatefuture-client climatefuture.io www.climatefuture.io`
