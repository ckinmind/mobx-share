import {Component} from 'react'
import {Button, Modal} from 'antd'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import ForceStore from './force-store'

const store = new ForceStore()

@observer
export default class Force extends Component {

  componentDidMount() {
    let svg = d3.select('body')
            .append('svg')
            .attr('width', 1200)
            .attr('height', 900);


    var nodes = [
      {"id": 1, "name": "server 1"},
      {"id": 2, "name": "server 2"},
      {"id": 3, "name": "server 3"},
      {"id": 4, "name": "server 4"},
      {"id": 5, "name": "server 5"},
      {"id": 6, "name": "server 6"},
      {"id": 7, "name": "server 7"},
      {"id": 8, "name": "server 8"},
      {"id": 9, "name": "server 9"},
      {"id": 10, "name": "server 10"},
      {"id": 11, "name": "server 11"},
      {"id": 12, "name": "server 12"},
      {"id": 13, "name": "server 13"},
      {"id": 14, "name": "server 14"},
      {"id": 15, "name": "server 15"},
      {"id": 16, "name": "server 16"},
      {"id": 17, "name": "server 17"},
      {"id": 18, "name": "server 18"},
      {"id": 19, "name": "server 19"},
      {"id": 20, "name": "server 20"},
    ]

    var links = [
      {source: 1, target: 2},
      {source: 1, target: 3},
      {source: 1, target: 4},
      {source: 2, target: 5},
      {source: 2, target: 6},
      {source: 3, target: 7},
      {source: 5, target: 8},
      {source: 6, target: 9},
      {source: 7, target: 4},
      {source: 7, target: 5},
      {source: 8, target: 9},
      {source: 3, target: 10},
      {source: 4, target: 11},
      {source: 8, target: 12},
      {source: 9, target: 13},
      {source: 8, target: 14},
      {source: 15, target: 20},
      {source: 10, target: 15},
      {source: 4, target: 16},
      {source: 7, target: 17},
      {source: 18, target: 19},
    ]

    var index = 10;
    var width = +svg.attr("width"),
        height = +svg.attr("height"),
        node,
        link;

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    update();
    function update() {
      link = svg.selectAll(".link")
        .data(links, function(d) { return d.target.id; })

      link = link.enter()
        .append("line")
        .attr("class", "link");

      node = svg.selectAll(".node")
        .data(nodes, function(d) { return d.id; })

      node = node.enter()
        .append("g")
        .attr("class", "node")
        .on("click", click)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

      node.append("circle")
        .attr("r", 8)
        .attr("fill", function(d) { return color(d.id); })

      node.append("title")
          .text(function(d) { return d.id; });

      node.append("text")
          .attr("dy", 3)
          .text(function(d) { return d.name; });

      simulation
          .nodes(nodes)
          .on("tick", ticked);

      simulation.force("link")
          .links(links);
    }

    function click(d) {
      nodes.push({id: index, name: "server " + index});
      links.push({source: d.id, target: index});
      index++;
      update();
    }

    function ticked() {
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node
          .attr("transform", function(d) { return "translate(" + d.x + ", " + d.y + ")"; });
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = undefined;
      d.fy = undefined;
    }



  }

  constructor(props) {
    super(props)
  }
  render() {
    return <div className="force-page">
      <p>力学图</p>
    </div>
  }

}
