/**
 * Created by xy on 15/4/13.
 */

let Row = require("./Row");
let Mask = require("./Mask");

class Tbody extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
        };
    }

    componentDidMount() {
       let uxtableBody= this.refs.uxtableBody;
       ////onScroll={this.onScroll.bind(this)}
       $(uxtableBody).on("scroll",this.onScroll.bind(this))
    }

    renderEmptyData() {

       if(this.props.data.length==0 && !this.props.mask ) {
           let _style={
             lineHeight: this.props.height-10+"px",
           }
          return (<div className="kuma-uxtable-body-emptyword" style={_style}>暂无数据.</div>);
       }
    }

    onScroll(e) {
        if(this.props.fixedColumn=='no') {
           return ;
        }
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer)
        }
        this.resizeTimer = setTimeout(function(){
            let target= $(e.target);
            if(target.hasClass('kuma-uxtable-body-scroll')) {
                $('.kuma-uxtable-body-fixed').scrollTop($('.kuma-uxtable-body-scroll').scrollTop());
                $('.kuma-uxtable-header-scroll').scrollLeft($('.kuma-uxtable-body-scroll').scrollLeft());
            }else {
                $('.kuma-uxtable-body-scroll').scrollTop($('.kuma-uxtable-body-fixed').scrollTop());
            }
        }, 0);
    }

    render() {
        
        let _props = this.props,
            me = this, 
            _columns = _props.columns, 
            _data = _props.data.length > 0 ? _props.data : [],
            _style={},_width=0,bodyWrapClassName;

        if(_props.fixedColumn=='fixed') {
           _columns= _props.columns.filter((item)=>{
              if(item.fixed) {
                   if(!item.width) {
                      item.width=100;
                   }
                   _width=item.width*1+_width;
                   return true
              }
           })
           _style={
             width:_width,
             minWidth:_width
           }
          bodyWrapClassName="kuma-uxtable-body-fixed";

        }else if(_props.fixedColumn=='scroll') {
           _columns= _props.columns.filter( (item) =>{
                if(!item.fixed) {
                   return true
                }else {
                   if(!item.width) {
                      item.width=100;
                   }
                   _width=item.width*1+_width;
                }
            })
            _style={
              width: _props.width-_width-3, //change 2 to 3, fix ie8 issue
              minWidth:_props.width-_width-3
            }
            bodyWrapClassName="kuma-uxtable-body-scroll";
        }else {
            bodyWrapClassName="kuma-uxtable-body-no";
        }
        return (
            <div className={bodyWrapClassName}  ref="uxtableBody" style={_style} > 
              <ul className={this.props.jsxprefixCls} >
                  {this.renderEmptyData()}
                  {_data.map(function(item,index) {
                      let renderProps={
                          columns: _columns,
                          rowIndex: item.jsxid,//tree mode, rowIndex need think more, so use jsxid
                          rowData: _data[index],
                          data: _data,
                          root: _props.root,
                          onModifyRow: _props.onModifyRow,
                          addRowClassName: _props.addRowClassName,
                          rowSelection: _props.rowSelection,
                          changeSelected: me.props.changeSelected,
                          subComp: _props.subComp,
                          actions: _props.actions,
                          key: 'row'+index,
                          rowHeight: _props.rowHeight,
                          mode: _props.mode,
                          renderModel: _props.renderModel,
                          fixedColumn: _props.fixedColumn,
                          level:1,
                          levels: _props.levels,
                          visible:true
                      };
                      return <Row {...renderProps} />
                  })}
                  <Mask visible={_props.mask}/>
              </ul>
            </div>
        );
    }

    componentWillUnmount() {
       this.resizeTimer=null;
    }

};

Tbody.propTypes= {
};

Tbody.defaultProps = {
    jsxprefixCls: "kuma-uxtable-body"
};

export default Tbody;
