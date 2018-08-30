const {render} = ReactDOM;
const {connect, Provider} = ReactRedux;
const {createStore, combineReducers} = Redux;

const UPDATE = "UPDATE";

const changeT = (txt) => ({type: UPDATE, txt});

const initState = `# Large Header

## Sub Header

[I'm an inline-style link](https://www.google.com)

\`back-ticks around inline code\`

\`\`\`
Block code has three ticks.
\`\`\`

1. First ordered list item
2. Another item

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Inline-style: ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

You can also make text **bold**... whoa!
`

const txtReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return action.txt;
    default:
      return state
  }
}

const store = createStore(txtReducer);

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.props.changeT(e.target.value)
  }

  render() {

    return (<div className="editor-cont">
      <h2 className="head">Enter Markdown</h2>
      <textarea id="editor" className="inputarea" onChange={this.handleChange} value={this.props.txt} rows="10" cols="70"></textarea>
    </div>)
  }
}

class Preview extends React.Component {
  constructor(props) {
    super(props)
    this.p_ref = React.createRef()
  }
  componentDidUpdate() {
    this.p_ref.current.innerHTML = marked(this.props.txt);
  }
  componentDidMount() {
    this.p_ref.current.innerHTML = marked(this.props.txt);
  }

  render() {
    return (<div className="preview-cont">
      <h2 className="head">Preview</h2>
      <div id="preview" className="preview" ref={this.p_ref}></div>
    </div>)
  }
}

const MapStateToProps = (state) => {
  return ({txt: state})
}

const MapDispatchToProps = (dispatch) => {
  return ({
    changeT: (txt) => dispatch(changeT(txt))
  })
}

Preview = connect(MapStateToProps)(Preview)
Editor = connect(MapStateToProps, MapDispatchToProps)(Editor)

const Cont = () => {
  return (<div className="o-cont">
    <Editor/>
    <Preview/>
  </div>)
}

class AppWrapper extends React.Component {
  render() {
    return (<Provider store={store}>
      <Cont/>
    </Provider>)
  }
}

render(<AppWrapper/>, document.getElementById('app'))
