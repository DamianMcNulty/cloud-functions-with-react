## Forked from https://github.com/odewahn/cloud-functions-with-react

Using Cloud Functions as the backend for a React app which is deployed as a static website on Google Cloud Storage at https://storage.googleapis.com/damianmcnulty-posts/index.html.

First enable billing and Cloud Functions in the [cloud console](https://console.cloud.google.com).
## Deploying your function to Google Cloud

The `posts` function grabs a page-by-page list of articles from oreilly.com:

```
gsutil mb gs://react-gcloud-template-deploy
gcloud beta functions deploy posts --stage-bucket react-gcloud-template-deploy --trigger-http
gcloud beta functions list
gcloud beta functions describe posts
```

## Set up the function 

Modify the Function URL in `src/state/posts.js`:

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


## Host the build directory as a static site from Google Cloud Storage

```
npm install
npm run build
gsutil mb gs://damianmcnulty-posts
gsutil defacl set public-read gs://damianmcnulty-posts
gsutil  -m rsync -r . gs://damianmcnulty-posts
```
