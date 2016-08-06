const App = React.createClass({
  getInitialState(){
    return {
      items: []
    }
  },
  addItem: function (item) {
    this.state.items.push({item: item, status: 'active'});
    this.setState({items: this.state.items});
  },
  render: function () {
    return <div>
      <Header addItem={this.addItem}/>
      <Footer />
    </div>
  }
});

const Header = React.createClass({
  addItem: function (e) {
    if (e.keyCode === 13) {
      const item = e.target.value;
      e.target.value = '';
      this.props.addItem(item);
    }
  },
  render: function () {
    return <div>
      <input type="text" name="input" onKeyUp={this.addItem}/>
    </div>
  }
});

const Footer = React.createClass({
  render: function () {
    return <div>
      <ItemsList />
      <button>all</button>
      <button>active</button>
      <button>completed</button>
      <button>clear all</button>
    </div>
  }
});

const ItemsList = React.createClass({
  render: function () {
    return <div>ItemsList</div>
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
