import BasicCard from "../../components/BasicCard";
import { useEffect, useState } from "react";
// import Search from "./components/Search/search";
import { TailSpin } from "react-loader-spinner";

export default function Articles() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [information, setInformation] = useState("");
  const [url, setUrl] = useState("https://dev.to/api/articles");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // let url = "https://dev.to/api/articles";
    // url = `https://dev.to/api/articles?tag=${inputValue}`;

    function getArticles() {
      fetch(url)
        //This operation returns a promise that could either resolve or reject
        // we must resolve the Response object to JSON format using the json() method
        .then((response) => response.json())
        // This also returns a promise and from there, we can resolve to get the actual data that we need
        .then((articles) => {
          console.log(articles);
          setData(articles);
          setError(null);
        })
        // In case the promise rejects, we will handle the error using the catch()
        .catch((err) => {
          setError(err.message);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getArticles();
  }, [url]);

  const articlesArray = data?.map((article) => (
    <BasicCard
      key={article.id}
      alt={article.alt}
      date={article.created_at}
      description={article.description}
      imgPath={article.cover_image}
      link="Read more"
      title={article.title}
      url={article.url}
    />
  ));

  function updateInputValue(event) {
    console.log(event.target.value);
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("dentro do submit");
    if (inputValue) {
      setUrl(`https://dev.to/api/articles?tag=${inputValue}`);
      setInformation(`Find all about ${inputValue}`);
    } else {
      setInformation("Please search for an article topic");
    }
  }

  if (!loading && !error) {
    return (
      <div className="Articles">
        <h1>Articles</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="search" onChange={updateInputValue} />
            <button type="submit">Search</button>
          </form>
          <h3>Search for {inputValue}</h3>
          <h4>{information}</h4>
        </div>
        <div className="articles-wrapper">{data && articlesArray}</div>
      </div>
    );
  } else if (error) {
    return <div>There is a problem fetching the post data - {error}</div>;
  } else {
    return (
      <div className="loader">
        <TailSpin
          height="180"
          width="180"
          radius="9"
          color="black"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }
}
