## ClimateFuture

## Setup

First, set up and run the [climatefuture server](https://github.com/kevinsqi/climatefuture) at localhost:3001.

Then, run the client app:

```
yarn install
yarn dev
```

Go to http://localhost:3000 to view the app.


**Alternate frontend-only setup:**

If you don't need to modify server code, you can also run `yarn dev:prod-api` to use the prod API instead of running a local API server at localhost:3001.


## Deployment

* Create app: `dokku apps:create climatefuture-client`
* Add dokku remote: `git remote add dokku dokku@climatefuture.io:climatefuture-client`
* Push to dokku: `git push dokku master`
* Add domains:
  * Add DNS records to point @ and www to dokku instance
  * `dokku domains:add climatefuture-client climatefuture.io www.climatefuture.io`

Setting up https with `dokku-letsencrypt` and [this guide](https://medium.com/@pimterry/effortlessly-add-https-to-dokku-with-lets-encrypt-900696366890):

* `dokku config:set --no-restart climatefuture-client DOKKU_LETSENCRYPT_EMAIL=<email>`
* `dokku letsencrypt climatefuture-client`
* `dokku letsencrypt:cron-job --add`
* Verify cron job with `crontab -l -u dokku`

Redirect to www:

* Install [dokku-redirect](https://github.com/dokku/dokku-redirect)
* `dokku redirect:set climatefuture-client climatefuture.io www.climatefuture.io`
