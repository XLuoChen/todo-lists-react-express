const App = React.createClass({
  render: function () {
    return <div>
      <Header />
      <Footer />
    </div>
  }
});

const Header = React.createClass({
  render: function () {
    return <div>Header</div>
  }
});

const Footer = React.createClass({
  render: function () {
    return <div>
      <ItemsList />
      <button>button</button>
    </div>
  }
});

const ItemsList = React.createClass({
  render: function () {
    return <div>ItemsList</div>
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
