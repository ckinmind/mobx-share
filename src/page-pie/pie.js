import {Component} from 'react'
import {Button, Modal} from 'antd'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import PieStore from './pie-store'

const store = new PieStore()

@observer
export default class Pie extends Component {

  componentDidMount() {
    var width = 400,
        height = 400,
        radius = 150;

    var data = [1, 2, 3, 5, 8, 13, 21];

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    var labelArc = d3.arc()
                .outerRadius(radius + 10)
                .innerRadius(radius + 10);

    var outerArc = d3.arc()
                .innerRadius(radius * 0.9)
                .outerRadius(radius * 0.9);

    var pie = d3.pie();

    var svg = d3.select('body')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
               .data(pie(data))
               .enter()
               .append("g")
               .attr("class", "arc")

    g.append("path")
      .attr("d", arc)
      .attr("fill", function(d, i) { return color(i); })
      .transition()
      .ease(d3.easeExpInOut)
      .duration(1000)
      .attrTween("d", tweenPie)

    g.append("text")
      .transition()
      .duration(1000)
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { 
        return d.data; 
      });

    //旋转效果
    function tweenPie(b) {
      b.innerRadius = 0;
      var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
      return function(t) { return arc(i(t)); };
    }

  }

  constructor(props) {
    super(props)
  }
  render() {
    return <div className="pie-page">

    </div>
  }

}
