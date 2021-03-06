import staticify from 'staticify';
import path from 'path';

const options = { pathPrefix: '/public' };

const stat = staticify(path.join(process.cwd(), 'public'), options);


const template = (dom, props) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Test React page</title>
</head>
<body>
  <div id="react">${dom}</div>
  <script>
    window.__layoutProps = ${JSON.stringify(props)}
  </script>
  <script src="${stat.getVersionedPath('/public/js/client.bundle.js')}"></script>
</body>
</html>`;

export default template;
