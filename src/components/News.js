import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  }

  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


  // article ek array he
  // articles = [
  //   {
  //     "source": { "id": "bbc-sport", "name": "BBC Sport" },
  //     "author": null,
  //     "title": "Australia vs New Zealand LIVE: Women’s T20 World Cup – cricket score, radio commentary, video highlights and text updates",
  //     "description": "Australia face New Zealand in the Women’s T20 World Cup at Sharjah Cricket Association Stadium, Sharjah – follow text updates, radio commentary and video highlights.",
  //     "url": "http://www.bbc.co.uk/sport/cricket/live/cz47289d4qrt",
  //     "urlToImage": "https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png",
  //     "publishedAt": "2024-10-08T14:37:17.2938853Z",
  //     "content": "Healy c Plimmer b Mair 26 (Aus 41-1)\r\nMedia caption, 'That's clever bowling!' - Mair removes Healy for 26\r\nAlyssa Healy wallops a wide one over point for four, but is gone next ball. \r\nA lot straight… [+218 chars]"
  //   },
  //   {
  //     "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
  //     "author": null,
  //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     "publishedAt": "2020-04-27T11:41:47Z",
  //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   },
  //   {
  //     "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   }
  // ]

  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    console.log("hello I am a constructor from news component");
    this.state = {
      // articles: this.articles,
      articles: [],
      loading: true,
      page:1,
      totalResults: 0
    }
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log("parsedData")
    this.setState({articles: parsedData.articles,
                  totalResults: parsedData.totalResults,
                  loading: false
                })
    this.props.setProgress(100);
    
  }

  // Ye neeche wale render method ke baad run hoga or usse bhi phele constructor run hoga
  async componentDidMount(){
    // console.log("cdm")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f31555c2db34a01b3a99d1b084f6b8c&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log("parsedData")
    // this.setState({articles: parsedData.articles,
    //               totalResults: parsedData.totalResults,
    //               loading: false
    //             })
    this.updateNews();
  }

  handlePrevClick = async ()=>{
    console.log("Previous")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f31555c2db34a01b3a99d1b084f6b8c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log("parsedData")


    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({page: this.state.page - 1})
    this.updateNews();
    
  }

  handleNextClick = async ()=>{
    console.log("Next")
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    // let url = `https://newsapi.org/v2/top-headlines?country =${this.props.country}&category=${this.props.category}&apiKey=9f31555c2db34a01b3a99d1b084f6b8c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // // console.log("parsedData")
    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    // }
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }

  fetchMoreData = async () => {
    if (this.state.articles.length >= this.state.totalResults) {
      return;  // Stop fetching when all articles are loaded
    }
  
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
  
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  };
  

  render() {
    // console.log("render")
    return (
      <>
        <h1 className='text-center' style={{margin: "35px 0px"}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}  // Updated condition
          loader={this.state.articles.length < this.state.totalResults ? <Spinner /> : null}  // Updated condition
        >


        <div className="container">
          <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
          {/* {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })} */}
          </div>
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
