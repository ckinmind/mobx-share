import { Component } from 'react'
import { Button, Modal } from 'antd'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import PackageStore from './package-store'

const store = new PackageStore()

@observer
export default class Package extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        var svg = d3.select("svg"),
            diameter =+ svg.attr("width"),
            g = svg.append("g").attr("transform", "translate(2,2)"),
            format = d3.format(",d");

        var pack = d3.pack()
            .size([diameter - 4, diameter - 4]);

        d3.json("/src/page-package/mock/flare.json", function(error, root) {
            if (error) throw error;

            root = d3.hierarchy(root)
                .sum(function(d) { return d.size; })
                .sort(function(a, b) { return b.value - a.value; });

            var node = g.selectAll(".node")
                .data(pack(root).descendants())
                .enter().append("g")
                .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

            node.append("title")
                .text(function(d) { return d.data.name + "\n" + format(d.value); });

            node.append("circle")
                .attr("r", function(d) { return d.r; });

            node.filter(function(d) { return !d.children; }).append("text")
                .attr("dy", "0.3em")
                .text(function(d) { return d.data.name.substring(0, d.r / 3); });
        });
    }
    render() {
        return <div className="package-page">

        <svg width="960" height="960"></svg>
      
    </div>
    }

}