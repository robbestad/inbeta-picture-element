/**
 * @jsx React.DOM
 */

var MyDiv = React.createClass({
  getDefaultProps: function () {
    return {
      windowProps:{
       width: document.body.clientWidth,
       height: window.innerHeight
      }
    };
  },
  addResizeAttach: function() {
    if(window.attachEvent) {
        window.attachEvent('onresize', this.onResize);
    }
    else if(window.addEventListener) {
        window.addEventListener('resize', this.onResize, true);
    }
    else {
        //The browser does not support Javascript event binding
    }
  },
  removeAttachmentResize: function() {
      if(window.detachEvent) {
          window.detachEvent('onresize', this.onResize);
      }
      else if(window.removeEventListener) {
          window.removeEventListener('resize', this.onResize);
      }
      else {
          //The browser does not support Javascript event binding
      }
  },
  getInitialState: function () {
   this.addResizeAttach();
   return {
      windowProps: this.props.windowProps
    }
  },
  componentDidUpdate: function (props, state) {
  },
  onResize: function(){
    this.setState({
      windowProps: {
         width: document.body.clientWidth,
         //height: document.body.clientHeight
         height: window.innerHeight
      }
    })
  },
  render: function () {
    // transferPropsTo will merge style & other props passed into our
    // component to also be on the child DIV.
    return this.transferPropsTo(React.DOM.div({
            onResize: this.onResize,

      style: {
        position: 'fixed',
        width: this.state.windowProps.width-20,
        height: this.state.windowProps.height-40,

      }
    }, this.state.windowProps.height+" x "+this.state.windowProps.width,this.props.children));
    }

});

React.renderComponent(MyDiv({
    className: 'my-box',
    style: {
        border: '1px solid #a95',
        background: 'blue',
        color:'white',
        width: "200px",
        height: window.innerHeight,
        display:'block',
        padding: '10px',
    }
}, ''), document.getElementById('my-box'));
