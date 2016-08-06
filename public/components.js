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
  addCompletedItem: function (i) {
    this.state.items[i].status = 'completed';
    this.setState({items: this.state.items});
  },
  render: function () {
    return <div>
      <Header addItem={this.addItem}/>
      <Footer items={this.state.items} deleteItem={this.deleteItem} addCompletedItem={this.addCompletedItem}/>
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
    const completed = this.state.items.filter(item => item.status === 'completed');
    this.setState({items: completed});
    console.log(this.state.items[0]);
  },
  render: function () {
    return <div>
      <ItemsList items={this.state.items} deleteItem={this.props.deleteItem}
                 addCompletedItem={this.props.addCompletedItem}/>
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
  addCompletedItem: function (index) {
    const isChecked = $("[name='checkbox']").attr("checked", 'true');//全选
    if (isChecked) {
      this.props.addCompletedItem(index);
    }
  },
  render: function () {
    const items = this.props.items.map((item, index)=> {
      return <div key={index}>
        <li>
          <input type="checkbox" name="checkbox" onChange={this.addCompletedItem.bind(this, index)}/>
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
