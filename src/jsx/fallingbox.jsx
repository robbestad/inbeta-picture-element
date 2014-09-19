/**
 * @jsx React.DOM
 */
/*var FallingBox = React.createClass({
  getDefaultProps: function () {
    return {
      myProps:{
       width: document.body.clientWidth,
       height: window.innerHeight,
       position: document.body.getElementById('falling-box')
      }
    };
  },
  fall: function() {
    console.log(document.body.getElementById('falling-box'));
    this.setState({
      myProps: {
         width: document.body.clientWidth,
         //height: document.body.clientHeight
         height: window.innerHeight
      }
    })
  },
  getInitialState: function () {
    //this.setInterval(this.fall, 5000); 

   return {
      myProps: this.props.myProps
    }
  },
  componentDidUpdate: function (props, state) {
  },

  render: function () {
    // transferPropsTo will merge style & other props passed into our
    // component to also be on the child DIV.
    return this.transferPropsTo(React.DOM.div({
      style: {
        left: 20,
        top: 40,
      
      }
    },this.props.children));
    }

});

React.renderComponent(FallingBox({
    className: 'falling-box',
    style: {
        border: '1px solid #a95',
        background: 'green',
        width: "50px",
        height: '50px',
        position: 'fixed',
        display:'block',
        padding: '50px',
    }
}, 'inline'), document.getElementById('falling-box'));
*/