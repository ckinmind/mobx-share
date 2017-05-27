import React from 'react'
import d3 from '../../v3.lesson/d3'
import '../p1.scss'


let info = `

\`\`\`js
123
\`\`\`


`;


class P1 extends React.Component {



    drawChart(){
        let width = 1000;
        let height = 800;

        this.data = {
            'name':'Mobx知识结构',
            isV: true,
            'children':
              [
                  {
                      'name':"API" ,
                      '_children':
                        [
                            {
                                'name': 'mobx',
                                _children: [
                                    {'name':"@observable", isV: true},
                                    {'name':"@action", isV: true},
                                    {'name':"autorun / when / reaction" },
                                    {'name':"@computed" },
                                    {'name':"intercept & observe" },
                                    {'name':"工具API: extendObservable, toJS, isObservable" },
                                ]
                            },
                            {
                                'name': 'mobx-react',
                                _children: [
                                    {'name':"@observer", isV: true},
                                    {'name':"Observer" },
                                    {'name':"Provider / inject" },
                                    {'name':"componentWillReact" },
                                    {'name':"PropTypes" }
                                ]
                            },


                        ]
                  },

                  {
                      'name':'Observable类型',
                      "_children":
                        [
                            {
                                "name":"object",
                                "_children":
                                  [
                                      {"name":"新增属性更新触发问题"}
                                  ]
                            },
                            {
                                'name':'arrays',
                                "_children":
                                  [
                                      {"name":"clear/replace/remove方法"},
                                      {"name":"slice/ toJS方法"},
                                      {"name":"arrays更新触发"}
                                  ]
                            },
                            {
                                'name':'maps',
                                "_children":
                                  [
                                      {"name":"两种定义的差别"},
                                      {"name":"和ES6map的区别"}
                                  ]
                            }
                        ]
                  },

                  {
                      "name":"问题",
                      "_children":
                        [
                            {"name":"1. 关于清理autorun"},
                            {"name":"2. 关于触发视图更新的一种方案"},
                            {"name":"3. 关于store的传递 / 单例模式"},
                            {"name":"4. 关于细粒度拆分"}
                        ]
                  },
              ]
        };

        //边界空白
        let padding = {left: 150, right:50, top: 20, bottom: 50 };

        this.svg = d3.select('#p1')
          .append('svg')
          .attr('width', width + padding.left + padding.right)
          .attr('height', height + padding.top + padding.bottom)
          .append('g')
          .attr("transform",`translate(${padding.left}, ${padding.top})`);

        //树状图布局
        this.tree = d3.layout.tree().size([height, width]);

        //对角线生成器
        this.diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);


        //给第一个节点添加初始坐标x0和x1
        let root = this.data;
        root.x0 = height / 2;
        root.y0 = 0;

        //以第一个节点为起始节点，重绘
        this.redraw(root);
    }

    //重绘函数
    redraw = (source) => {
        let that = this;
        /** 1. 计算节点和连线的位置 */

          //应用布局，计算节点和连线
        let nodes = this.tree.nodes(this.data);
        let links = this.tree.links(nodes);

        //重新计算节点的y坐标
        nodes.forEach(d => d.y = d.depth * 180);

        /** 2. 节点的处理*/

          //获取节点的update部分
        let nodeUpdate = this.svg.selectAll(".node")
            .data(nodes, d => d.name);

        //获取节点的enter部分
        let nodeEnter = nodeUpdate.enter();

        //获取节点的exit部分
        let nodeExit = nodeUpdate.exit();

        //1. 节点的 Enter 部分的处理办法
        let enterNodes = nodeEnter.append("g")
          .attr("class", "node")
          .attr("transform", d => `translate(${source.y0},  ${source.x0})`)
          .on("click", function(d){
              that.toggle(d);
              that.redraw(d);
          });

        enterNodes.append("circle")
          .attr("r", 0)
          .style("fill", d => d._children ? "lightsteelblue" : "#fff");

        enterNodes.append("text")
          .attr("x", d => d.children || d._children ? -14 : 14)
          .attr("dy", ".35em")
          .attr("text-anchor", d => d.children || d._children ? "end" : "start")
          .text(d => d.name)
          .style("fill-opacity", 0);


        //2. 节点的 Update 部分的处理办法
        let updateNodes = nodeUpdate.transition()
          .duration(500)
          .attr("transform", d => `translate(${d.y}, ${d.x})`);

        updateNodes.select("circle")
          .attr("r", 8)
          .style("fill", d => d._children ? "lightsteelblue" : "#fff");

        updateNodes.select("text")
          .style("fill-opacity", 1)
          .style('font-weight', d => d.isV ? 'bold' : 'normal')
          .style('fill', d => d.isV ? 'red' : 'black');


        //3. 节点的 Exit 部分的处理办法
        let exitNodes = nodeExit.transition()
          .duration(500)
          .attr("transform", d => `translate(${source.y}, ${source.x})`)
          .remove();

        exitNodes.select("circle").attr("r", 0);

        exitNodes.select("text").style("fill-opacity", 0);

        /** 3. 连线的处理 */

          //获取连线的update部分
        let linkUpdate = this.svg.selectAll(".link")
            .data(links, function (d) {
                return d.target.name;
            });

        //获取连线的enter部分
        let linkEnter = linkUpdate.enter();

        //获取连线的exit部分
        let linkExit = linkUpdate.exit();

        //1. 连线的 Enter 部分的处理办法
        linkEnter.insert("path", ".node")
          .attr("class", "link")
          .attr("d", function (d) {
              var o = {x: source.x0, y: source.y0};
              return that.diagonal({source: o, target: o});
          })
          .transition()
          .duration(500)
          .attr("d", that.diagonal);

        //2. 连线的 Update 部分的处理办法
        linkUpdate.transition()
          .duration(500)
          .attr("d", that.diagonal);

        //3. 连线的 Exit 部分的处理办法
        linkExit.transition()
          .duration(500)
          .attr("d", function (d) {
              var o = {x: source.x, y: source.y};
              return that.diagonal({source: o, target: o});
          })
          .remove();


        /** 4. 将当前的节点坐标保存在变量x0、y0里，以备更新时使用*/
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

    };

    //切换开关，d 为被点击的节点
    toggle = (d) => {
        if (d.children) { //如果有子节点
            d._children = d.children; //将该子节点保存到 _children
            d.children = null;  //将子节点设置为null
        } else {  //如果没有子节点
            d.children = d._children; //从 _children 取回原来的子节点
            d._children = null; //将 _children 设置为 null
        }
    };


    componentDidMount(){
        this.drawChart();
    }

    render() {
        return (
          <div>
              <h1 style={{textAlign: 'center'}}>Mobx知识结构</h1>
              <div id="p1">
              </div>
              {/*<Markdown source={info} />*/}
          </div>
        );
    }
}

export default P1;
