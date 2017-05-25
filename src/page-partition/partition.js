import {Component} from 'react'
import {Button, Modal} from 'antd'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import PartitionStore from './partition-store'

const store = new PartitionStore()

@observer
export default class Partition extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className="partition-page">

     
    </div>
  }
  componentDidMount(){
    var w = 1120,
        h = 600,
        x = d3.scaleLinear()
          .range([0, w]),
        y = d3.scaleLinear()
          .range([0, h]);

    var vis = d3.select("body").append("div")
        .attr("class", "chart")
        .style("width", w + "px")
        .style("height", h + "px")
      .append("svg")
        .attr("width", w)
        .attr("height", h);

    var partition = d3.partition();

    d3.json("src/page-partition/partition.json", function(error,root) {
      console.log( root );
      window.root = root;
      if (error) throw error;

      
      root = d3.hierarchy(root)
              .sum(function(d) { return d.size; })
              .sort(function(a, b) { return  b.value - a.value; }); // 排序 从大到小
      // console.log( partition(root) ) // 返回一个object 最顶级，里边包含了所有的子孙
      // console.log( partition(root).descendants() ) // descendants 后代，返回一个同级数组
      partition(root);
      var g = vis.selectAll("g")
          .data(root.descendants())
        .enter().append("g")
          .attr("transform", function(d) {   return "translate(" + x(d.y0) + "," + y(d.x0) + ")"; }) // y0 和 x0是平移量 因为是水平布局所以X,Y对调了
          .on("click", click);
    // console.log( root )

      g.append("rect")
          .attr("width", function(d){ return x(d.y1) - x(d.y0) ;   })
          .attr("height", function(d) { return y(d.x1) - y(d.x0) ; })
          .attr("class", function(d) { return d.children ? "parent" : "child"; });

      g.append("text")
          .attr("transform", transform)
          .attr("dy", ".35em")
          .style("opacity", function(d) { return y(d.x1) - y(d.x0) > 12 ? 1 : 0; })
          .text(function(d) { return d.data.name; })

      d3.select(window)
          .on("click", function() { click(root.descendants()[0]); })

      function click(d) {
        console.log( d )
        // if (!d.children) return;

        x.domain([d.y0, 1]).range([d.depth ? 40 : 0, w]);
        y.domain([d.x0, d.x1]);

        var t = g.transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .attr("transform", function(d) { return "translate(" + x(d.y0) + "," + y(d.x0) + ")"; });

        t.select("rect")
            .attr("width", function(d){ return x(d.y1) - x(d.y0) ; })
            .attr("height", function(d) { return y(d.x1) - y(d.x0) ; });

        t.select("text")
            .attr("transform", transform)
            .style("opacity", function(d) { return y(d.x1) - y(d.x0) > 12 ? 1 : 0; });

        d3.event.stopPropagation();
      }

      function transform(d) {
        return "translate(8," + (y(d.x1)-y(d.x0)) / 2 + ")";
      }
    });
  }
}
