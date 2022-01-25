import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {

    return (
      <Html>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
            <script async src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="stylesheet" href="https://db.onlinewebfonts.com/c/bcd39059bde839c13f3b3f12fe14a3db?family=MorrisSansW01-LightCond" type="text/css" />
            <script async src="https://kit.fontawesome.com/b3d77aa7d2.js" crossOrigin="anonymous"></script>
            <script async src="https://cdnjs.cloudflare.com/ajax/libs/react-modal/3.14.3/react-modal.min.js" integrity="sha512-MY2jfK3DBnVzdS2V8MXo5lRtr0mNRroUI9hoLVv2/yL3vrJTam3VzASuKQ96fLEpyYIT4a8o7YgtUs5lPjiLVQ==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        </Head>
        <body id="root">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument