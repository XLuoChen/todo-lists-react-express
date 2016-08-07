const App = React.createClass({
  getInitialState(){
    return {
      items: [],
      toLoadItems: []
    }
  },
  addItem: function (item) {
    this.state.items.push({item: item, isDone: false});
    this.setState({items: this.state.items});
    this.setState({toLoadItems: this.state.items});
  },
  deleteItem: function (item) {
    const items = this.state.items;
    const i = items.indexOf(item);
    this.state.items.splice(i, 1);
    this.setState({items});
  },
  changeStatus: function (item) {
    const items = this.state.items;
    const i = items.indexOf(item);
    this.state.items[i].isDone = !this.state.items[i].isDone;
    this.setState({items});
  },
  getAllItems: function () {
    this.setState({toLoadItems: this.state.items});
  },
  getCompletedItems: function () {
    const completed = this.state.items.filter(item => item.isDone === true);
    this.setState({toLoadItems: completed});
  },
  getActiveItems: function () {
    const aciveItems = this.state.items.filter(item => item.isDone === false);
    this.setState({toLoadItems: aciveItems});
  },
  clearCompleted: function () {
    const items = this.state.items.filter(item => item.isDone === false);
    this.setState({items});
  },
  render: function () {
    return <div>
      <Header addItem={this.addItem}/>
      <Footer toLoadItems={this.state.toLoadItems} items={this.state.items}
              deleteItem={this.deleteItem} changeStatus={this.changeStatus}
              getAllItems={this.getAllItems} getCompletedItems={this.getCompletedItems}
              getActiveItems={this.getActiveItems}
              clearCompleted={this.clearCompleted}/>
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
  getAllItems: function () {
    this.props.getAllItems();
  },
  getCompletedItems: function () {
    this.props.getCompletedItems();
  },
  getActiveItems: function () {
    this.props.getActiveItems();
  },
  clearCompleted: function () {
    this.props.clearCompleted();
  },
  render: function () {
    const count = this.props.items.filter(item => item.isDone === false).length;
    return <div>
      <ItemsList items={this.props.toLoadItems} deleteItem={this.props.deleteItem}
                 changeStatus={this.props.changeStatus}/>
      <p>{count} items left</p>
      <button onClick={this.getAllItems}>all</button>
      <button onClick={this.getActiveItems}>active</button>
      <button onClick={this.getCompletedItems}>completed</button>
      <button onClick={this.clearCompleted}>clear completed</button>
    </div>
  }
});

const ItemsList = React.createClass({
  remove: function (item) {
    this.props.deleteItem(item);
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
          <button onClick={this.remove.bind(this, item)}>X</button>
        </li>
      </div>
    });
    return <div>
      {items}
    </div>
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
