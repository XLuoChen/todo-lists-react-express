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
  deleteItem: function (i) {
    this.state.items.splice(i, 1);
    this.setState({items: this.state.items});
  },
  render: function () {
    return <div>
      <Header addItem={this.addItem}/>
      <Footer items={this.state.items} deleteItem={this.deleteItem}/>
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
  getInitialState(){
    return {
      items: []
    }
  },
  setAllItems: function () {
    this.setState({items: this.props.items});
  },
  render: function () {
    return <div>
      <ItemsList items={this.state.items} deleteItem={this.props.deleteItem}/>
      <button onClick={this.setAllItems}>all</button>
      <button>active</button>
      <button>completed</button>
      <button>clear all</button>
    </div>
  }
});

const ItemsList = React.createClass({
  remove: function (index) {
    this.props.deleteItem(index);
  },
  render: function () {
    const items = this.props.items.map((item, index)=> {
      return <div key={index}>
        <li>
          <input type="checkbox"/>
          {item.item}
          <button onClick={this.remove.bind(this, index)}>X</button>
        </li>
      </div>
    });
    return <div>
      {items}
    </div>
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
