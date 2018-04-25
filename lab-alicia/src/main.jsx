// import '.style/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
// import UserInputForm from './UserInputForm.js';
import SearchForm from './SearchForm.js';
import SearchResultList from './SearchResultList.js';

const REDDIT_API_PREFIX = 'http://www.reddit.com/r/';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Reddit Search',
      results: [],
      error: '',
      errorMessage: 'Results not found.',
      hasSearched: false,
      loading: false
    };

    // this.performSearch = this.performSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(query) {
    this.setState({
      hasSearched: true,
      isLoading: true
    })
    fetch(`${REDDIT_API_PREFIX}` + query.userInput + '.json?limit='  + query.limit)
    .then(res => {
      this.setState({error: false});
      return res.json();
    }).then(json => {
      console.log('json', json)
      this.setState({
        results: json.data.children.map(item => {
          return <li key={item.data.id}>
            <a href={item.data.url}>
              <h2>{item.data.title}</h2>
            </a>
          </li>  
        })
      })
    // this.setState({isLoading: false});

    })
    .catch(err => {
      this.setState({error: true, results: []});
      this.setState({isLoading: false});
    })
  } 

  render() {
    return <div>
        <h1>{this.state.title}</h1>
        {/* <UserInputForm /> */}
        <SearchForm error={this.state.error} submit={this.handleSubmit} />
        <div className='errorMessage'>{this.state.errorMessage} </div>
        <SearchResultList results={this.state.results} />
        {/* hasSearched={this.state.hasSearched} isLoading={this.state.isLoading}  */}
      </div>
  }
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);