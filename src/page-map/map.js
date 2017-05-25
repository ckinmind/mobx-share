import {Component} from 'react'
import {Button, Modal} from 'antd'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import MapStore from './map-store'

const store = new MapStore()

@observer
export default class Map extends Component {
  componentDidMount() {
    let svg = d3.select('body')
            .append('svg')
            .attr('width', 1200)
            .attr('height', 900);

    let pro = d3.geoMercator()
                    .center([70, 55])
                    .scale(800)
                    .translate([10, 50])

    let path = d3.geoPath()
                  .projection(pro);

    d3.json("/src/page-map/china-new.json", function(error, root) {
        if (error) 
            return console.error(error);
        
        
        svg.append("g").attr("class", "china")
            .selectAll("path")
            .data( root.features )
            .enter()
            .append("path")
            .attr("d", path )   //使用地理路径生成器
            .attr("fill", "#11257F")
            .attr("fill-opacity", "0.7")
            .on("mouseover",function(d,i){
                d3.select(this)
                   .attr("fill","#051322");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                   .attr("fill","#11257F");
            })

        // 省会文字，
        d3.json("/src/page-map/capital.json", function(error, root){
          if (error) 
                return console.error(error);

          svg.selectAll(".place-label")
              .data(root.features)
            .enter().append("text")
              .attr("class", "place-label")
              .attr("transform", function(d) {
                return "translate(" + pro(d.geometry.coordinates) + ")"; 
              })
              .attr("dy", ".75em")
              .attr("font-size", "12px")
              .text(function(d) { 
                return d.properties.name; 
              });
      

          //插入分组元素
          var location = svg.selectAll(".location")
              .data(root.features)
              .enter()
              .append("g")
              .attr("class","location")
              .attr("transform",function(d){
                  //计算标注点的位置
                  return "translate(" + pro(d.geometry.coordinates) + ")"; 
              });

          location.each(function(d){

            //对每个圆点设置不同的初始化时间
            d3.select(this).append("circle")
                  .attr("r",0)
                  .transition()
                  .duration(1000 + Math.random()*1000)
                  .ease(d3.easeBounce)
                  .attr("r", 7)
                  .style("fill", "yellow");
          })
        })
        
    });


  }

  constructor(props) {
    super(props)
  }
  render() {
    return <div className="map-page">
        <div>地图示例：</div>

    </div>
  }


}
