# api-tester
Just clone and run index.html. no gulp tasks or any server required.
This has only been tested with GET requests.
Tested with two publicly available APIs:
1. Random quote generator
      `headers: {
        'X-Mashape-Key': 'rHhxaRUq1HmshEKArz7UtfGaaLZVp1k5uMQjsnYht2hLNkssG2',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",`
      
2. musixmatch

      `
      curl --get --include 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/artist.search?page=1&page_size=5&q_artist=coldplay&s_artist_rating=desc' \
      -H 'X-Mashape-Key: bjFJlFafsfmshVrFKCduMlOo9ijVp1xalwcjsnATP9qB4cfoAG' \
      -H 'Accept: application/json'
      `
