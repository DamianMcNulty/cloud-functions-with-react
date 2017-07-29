#Forked from https://github.com/odewahn/cloud-functions-with-react

Using Cloud Functions as the backend for a React app which is deployed as a static website on Google Cloud Storage at https://storage.googleapis.com/damianmcnulty-posts/index.html.

## Deploying your function to Google Cloud

The `posts` function, which is the user's main entry-point for the example, is defined in the root level file `index.js` of the project directory, and uses the [node-fetch](https://www.npmjs.com/package/node-fetch) module to grab a page-by-page list of articles from oreilly.com:


Enable billing and Cloud Functions in the [cloud console](https://console.cloud.google.com).

```
gsutil mb -p react-gcloud-template gs://react-gcloud-template-deploy
```

```
gcloud beta functions deploy posts --stage-bucket react-gcloud-template-deploy --trigger-http
```

The `httpsTrigger` section of the log has the URL for the deployed function:

```
http https://us-central1-react-gcloud-template.cloudfunctions.net/posts
```

If you forget this link, you can always recover it like this:

```
$ gcloud beta functions list
NAME   STATUS  TRIGGER
posts  READY   HTTP Trigger
```

And then `describe` it, like so:

```
$ gcloud beta functions describe posts
availableMemoryMb: 256
entryPoint: posts
httpsTrigger:
  url: https://us-central1-react-gcloud-template.cloudfunctions.net/posts
latestOperation: operations/cmVhY3QtZ2Nsb3VkLXRlbXBsYXRlL3VzLWNlbnRyYWwxL3Bvc3RzLzNfQXlBNGR2LUhN
name: projects/react-gcloud-template/locations/us-central1/functions/posts
serviceAccount: react-gcloud-template@appspot.gserviceaccount.com
sourceArchiveUrl: gs://react-gcloud-template-deploy/us-central1-posts-unmlnlxxrudy.zip
status: READY
timeout: 60s
updateTime: '2017-06-28T14:18:12Z'
```

## Set up the React frontend

If you haven't already, run `npm install` to download all your dependencies into the `node_modules` directory.  

Once `npm install` completes, run `npm start` to fire up the app.  Note that you may need to modify the URL in `src/state/posts.js` to match your functions emulator:

```
return fetch(
  "http://localhost:8010/react-gcloud-template/us-central1/posts",
  {
    method: "POST",
    body: JSON.stringify({
      page: getState().Posts.get("page")
    })
  }
)
```

Once you're ready to deploy the React app, you can run `npm run build`, which will create a compiled, minified app in a `build` directory that is ready to publish as a static site.

Host the build directory as a static site from Google Cloud Storage

```
gsutil mb gs://damianmcnulty-posts
gsutil defacl set public-read gs://damianmcnulty-posts
gsutil  -m rsync -r . gs://damianmcnulty-posts
```
