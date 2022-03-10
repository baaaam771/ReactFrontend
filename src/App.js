
import './App.css';
import { Component } from 'react';
import api from './api';
import PostView from './Components/PostView';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }


  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    this.setState({results: _results.data})
    // _results.data 아무것도 없음
    console.log(_results)
  }




  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handlingSubmit = async (event) => {
    event.preventDefault()// event 기능 막기 (새로고침 방지)
    let result = await api.createPost({title: this.state.title, content: this.state.content})
    console.log("완료됨!", result.data)
  }

  render() {
    return (
      <div className="App">
        <div className="PostingSection">
          <h2>글 작성하기</h2>
          <form onSubmit = {this.handlingSubmit}>
          <input 
            name = "title"
            value = {this.state.title}
            onChange = {this.handlingChange}
          />
          <br />
          <br />
          <textarea 
            name = "content"
            value = {this.state.content}
            onChange = {this.handlingChange}
          />
          <br />
          <button type = "submit">제출하기</button>
          </form>
        </div>
        <div className="ViewSection">
          {
            this.state.results.map((post) =>
            <PostView key = {post.id} title = {post.title} content = {post.content}/>
            )
          }
          
        </div>
      </div>
    );

  }
}

export default App;
