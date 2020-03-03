import React, {Component} from 'react';
import './footer.css';

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        Year: ''
    }
}

  componentDidMount() {
    var currentYear = new Date().getFullYear();
    var year = 2019;
    if (currentYear == year) {
        this.setState({
            Year: currentYear
        })
    } else {
        this.setState({
            Year: year + '-' + new Date().getFullYear()
        })
    }
}

  render() {
    return (
      <footer className="app-footer">
       <span >© {this.state.Year}  All Rights Reserved By 
          <span style = {{color:'#20a8d8',fontWeight:'bold'}}> InitioTechMedia</span>
        </span>
        <span className="ml-auto">Developed By , <a   href="https://initiotechmedia.com" target="_blank">InitioTechMedia</a></span>
      </footer>
    )
  }
}

export default Footer;
