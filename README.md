# Description of Code
I completed the frontend and backend studies given in the project case. Apart from that, i completed all the optional parts in the Frontend part. I did not have enough time for the optional parts of the backend.I got help from styled-components react to create a faster and more readable CSS in the code.
### Answer a few Questions
* The time you spent on the case study
    9 hours totally

* What would you change in your submission to make it production ready?
    I wanted to visually show the api data I took on the screen. While doing this, i have already examined the raw data that the OMDB api has given to me.

* What would you do differently if you had more time?
    I would make the so-called backend optional and of course i would use css frameworks to create a more beautiful frontend.I would make the site a little more dynamic.

## I would like to mention a few important parts of the code;

```
  const fetchData = async (search) => {
    const firstResponse = await axios.get(
      `https://www.omdbapi.com/?s=${search}&page=1&apikey=${API_KEY}`
    );
    const secondResponse = await axios.get(
      `https://www.omdbapi.com/?s=${search}&page=2&apikey=${API_KEY}`
    );
    if (
      firstResponse.data.Response === "True" && secondResponse.data.Response === "True"
    ) {
      setTotalResults(
        firstResponse.data.Search.concat(secondResponse.data.Search)
      );
      console.log(totalResults);
      updateMovieList(totalResults);
    }
  };
```

In this part, I had to combine the default 10 data given to me by the OMDB API with the data on the 2nd page to extract 20 and according to the search result, i had 20 movies on the main page.

```
function onTextChange(event){
    const { value } = event.target;
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(value);
  }
  useEffect(() => {
    if (searchQuery.length > 2) {
        const timeoutId = setTimeout(() => {
            fetchData(searchQuery);
        }, 300);
        updateTimeoutId(timeoutId);
    } else {
        updateMovieList([]);
    }
    }, [searchQuery]);

```
In this part of the code, after typing at least 3 letters in the search bar, it searches and does not search if there is no movie in the searched word.