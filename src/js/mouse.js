/** @jsx React.DOM */
var Mouse = React.createClass({displayName: 'Mouse',
    getInitialState: function () {
        return {
            pos: {'x': 0, 'y': 0},
            relativePos: {'x': 0, 'y': 0},
            dragging: false,
            divText: 'Click Me!'
        }
    },
    onMouseMove: function (e) {
        if (!this.state.dragging) return;
        this.setState({
            pos: {
                x: x = e.clientX - this.state.relativePos.x,
                y: e.clientY - this.state.relativePos.y
            },
            divText: 'Aaaaah'
        })
    },
    onMouseDown: function (e) {
        var dragging = !this.state.dragging;
        var text = 'Click Me!';
        if(dragging) text = 'Move Me!';
        this.setState({
                dragging: dragging,
                relativePos: {
                    'x': e.pageX - this.state.relativePos.x,
                    'y': e.pageY - this.state.relativePos.y
                },
                divText: text
            }
        )
    },
    render: function () {
        var backgroundColor = backgroundColor = "#ffffff";
        if (this.state.dragging) backgroundColor = "#00ff00";
        return this.transferPropsTo(React.DOM.div({
            onMouseMove: this.onMouseMove,
            onMouseDown: this.onMouseDown,
            style: {
                left: this.state.pos.x + 'px',
                top: this.state.pos.y + 'px',
                backgroundColor: backgroundColor
            }
        }, this.state.divText, this.props.children));
    }

});

React.renderComponent(Mouse({
    className: 'my-box',
    style: {
        border: '1px solid blue',
        color: 'black',
        padding: '15px 0 0 0',
        width: "250px",
        height: "250px",
        top: "0px",
        textAlign: 'center',
        position: 'absolute',
        display: 'block',
        zIndex:'1',
        opacity:'0.7'
    }
}, ''), document.getElementById('my-box'));