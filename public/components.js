const App = React.createClass({
  getInitialState(){
    return {
      items: []
    }
  },
  addItem: function (item) {
    this.state.items.push({item: item, isDone: false});
    this.setState({items: this.state.items});
  },
  deleteItem: function (i) {
    this.state.items.splice(i, 1);
    this.setState({items: this.state.items});
  },
  changeStatus: function (item) {
    const items = this.state.items;
    const i = items.indexOf(item);
    this.state.items[i].isDone = !this.state.items[i].isDone;
    this.setState({items});
  },
  render: function () {
    return <div>
      <Header addItem={this.addItem}/>
      <Footer items={this.state.items} deleteItem={this.deleteItem} changeStatus={this.changeStatus}/>
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
  setCompletedItems: function () {
    const completed = this.state.items.filter(item => item.isDone === true);
    this.setState({items: completed});
  },
  render: function () {
    return <div>
      <ItemsList items={this.state.items} deleteItem={this.props.deleteItem} changeStatus={this.props.changeStatus}/>
      <button onClick={this.setAllItems}>all</button>
      <button >active</button>
      <button onClick={this.setCompletedItems}>completed</button>
      <button>clear all</button>
    </div>
  }
});

const ItemsList = React.createClass({
  remove: function (index) {
    this.props.deleteItem(index);
  },
  changeStatus: function (item) {
    this.props.changeStatus(item);
  },
  render: function () {
    const items = this.props.items.map((item, index)=> {
      return <div key={index}>
        <li>
          <input type="checkbox" onClick={this.changeStatus.bind(this, item)} checked={item.isDone}/>
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
